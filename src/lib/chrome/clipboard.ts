/**
 * Copy text to the clipboard. Returns true on success, false if blocked
 * (e.g. no trusted user gesture, or a permissions policy denies it) so callers
 * can decide whether to flash a "copied" confirmation.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
