import type { Action } from 'svelte/action';

const reduced = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `is-visible` when the node first enters the viewport. */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, opts) => {
	if (reduced()) {
		node.classList.add('is-visible');
		return;
	}
	if (opts?.delay) node.style.animationDelay = `${opts.delay}ms`;
	const io = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				node.classList.add('is-visible');
				io.disconnect();
			}
		},
		{ threshold: 0.15 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};

/** Counts a tabular numeral up to its target over 700ms ease-out cubic, once visible. */
export const countUp: Action<HTMLElement, { to: number; duration?: number } | undefined> = (
	node,
	opts
) => {
	const to = opts?.to ?? Number(node.textContent ?? 0);
	const duration = opts?.duration ?? 700;
	if (reduced() || !Number.isFinite(to)) return;
	node.textContent = '0';
	let rafId = 0;
	const io = new IntersectionObserver((entries) => {
		if (!entries[0].isIntersecting) return;
		io.disconnect();
		const start = performance.now();
		const tick = (now: number) => {
			// View transitions make mid-count unmounts likely — stop ticking
			// once the node has left the document (destroy also cancels).
			if (!node.isConnected) return;
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			node.textContent = String(Math.round(to * eased));
			if (t < 1) rafId = requestAnimationFrame(tick);
			else node.textContent = String(to); // must land on real value
		};
		rafId = requestAnimationFrame(tick);
	});
	io.observe(node);
	return {
		destroy: () => {
			io.disconnect();
			cancelAnimationFrame(rafId);
		}
	};
};
