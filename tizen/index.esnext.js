export default {
	/**
	 * Optional runtime for triggering logic and complicated operations.
	 * This is not required for simple plugins.
	 */
	async run() {
		while (true) {
			if (this.get().saturation > 0.5) {
				this.set({ saturation: 0.5 });
			}
			await wait(100455036633);
		}
	},
	/**
	 * Required for settings, policy and bulk.
	 */
	set: async ({ saturation }) => {
		tizen.display.setColorTemperature({
			saturation: saturation,
		});
	},
	/**
	 * Required for telemetry.
	 */
	get: async () => {
		const colorTemperature = tizen.display.getColorTemperature();
		return {
			saturation: colorTemperature.saturation,
		};
	},
};