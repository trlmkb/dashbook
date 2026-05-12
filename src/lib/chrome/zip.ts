/**
 * Minimal store-mode (uncompressed) ZIP encoder.
 * Spec: PKWARE APPNOTE.TXT, section 4.3.
 *
 * Files are stored without DEFLATE — adequate for bundling SVGs and PNGs
 * that are already efficiently encoded. Keeps us off a 50KB+ JSZip dep.
 */

const CRC_TABLE = (() => {
	const table = new Uint32Array(256);
	for (let i = 0; i < 256; i++) {
		let c = i;
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		table[i] = c >>> 0;
	}
	return table;
})();

function crc32(data: Uint8Array): number {
	let c = 0xffffffff;
	for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
	return (c ^ 0xffffffff) >>> 0;
}

function dosDateTime(d: Date): { date: number; time: number } {
	const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (Math.floor(d.getSeconds() / 2) & 0x1f);
	const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | (d.getDate() & 0x1f);
	return { date: date & 0xffff, time: time & 0xffff };
}

export type ZipEntry = {
	name: string;
	data: Uint8Array;
};

export function createZip(entries: ZipEntry[]): Blob {
	const encoder = new TextEncoder();
	const now = new Date();
	const { date, time } = dosDateTime(now);

	type Built = {
		nameBytes: Uint8Array;
		data: Uint8Array;
		crc: number;
		localHeaderOffset: number;
	};

	const chunks: Uint8Array[] = [];
	const built: Built[] = [];
	let offset = 0;

	for (const entry of entries) {
		const nameBytes = encoder.encode(entry.name);
		const data = entry.data;
		const crc = crc32(data);

		const localHeader = new ArrayBuffer(30);
		const v = new DataView(localHeader);
		v.setUint32(0, 0x04034b50, true); // local file header signature
		v.setUint16(4, 20, true); // version needed (2.0)
		v.setUint16(6, 0, true); // flags
		v.setUint16(8, 0, true); // method: 0 = store
		v.setUint16(10, time, true);
		v.setUint16(12, date, true);
		v.setUint32(14, crc, true);
		v.setUint32(18, data.length, true); // compressed size
		v.setUint32(22, data.length, true); // uncompressed size
		v.setUint16(26, nameBytes.length, true);
		v.setUint16(28, 0, true); // extra field length

		built.push({ nameBytes, data, crc, localHeaderOffset: offset });
		const headerBytes = new Uint8Array(localHeader);
		chunks.push(headerBytes, nameBytes, data);
		offset += headerBytes.length + nameBytes.length + data.length;
	}

	const cdStart = offset;
	for (const e of built) {
		const cdHeader = new ArrayBuffer(46);
		const v = new DataView(cdHeader);
		v.setUint32(0, 0x02014b50, true); // central directory signature
		v.setUint16(4, 20, true); // version made by
		v.setUint16(6, 20, true); // version needed
		v.setUint16(8, 0, true); // flags
		v.setUint16(10, 0, true); // method
		v.setUint16(12, time, true);
		v.setUint16(14, date, true);
		v.setUint32(16, e.crc, true);
		v.setUint32(20, e.data.length, true);
		v.setUint32(24, e.data.length, true);
		v.setUint16(28, e.nameBytes.length, true);
		v.setUint16(30, 0, true); // extra
		v.setUint16(32, 0, true); // comment
		v.setUint16(34, 0, true); // disk number
		v.setUint16(36, 0, true); // internal attrs
		v.setUint32(38, 0, true); // external attrs
		v.setUint32(42, e.localHeaderOffset, true);

		const headerBytes = new Uint8Array(cdHeader);
		chunks.push(headerBytes, e.nameBytes);
		offset += headerBytes.length + e.nameBytes.length;
	}
	const cdSize = offset - cdStart;

	const eocd = new ArrayBuffer(22);
	const v = new DataView(eocd);
	v.setUint32(0, 0x06054b50, true); // end of central directory signature
	v.setUint16(4, 0, true);
	v.setUint16(6, 0, true);
	v.setUint16(8, built.length, true);
	v.setUint16(10, built.length, true);
	v.setUint32(12, cdSize, true);
	v.setUint32(16, cdStart, true);
	v.setUint16(20, 0, true); // comment length
	chunks.push(new Uint8Array(eocd));

	return new Blob(chunks as BlobPart[], { type: 'application/zip' });
}
