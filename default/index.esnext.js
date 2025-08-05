// Helper function to create a promise-based wait function
function wait(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

// Browser compatible object
var colorTemperatureModule = {
    /**
     * Optional runtime for triggering logic and complicated operations.
     * This is not required for simple plugins.
     */
    run: function() {
        var self = this;
        
        function runLoop() {
            return self.get().then(function(result) {
                if (result.saturation > 0.5) {
                    return self.set({ saturation: 0.5 });
                }
            }).then(function() {
                return wait(1000);
            }).then(function() {
                return runLoop();
            });
        }
        
        return runLoop();
    },
    /**
     * Required for settings, policy and bulk.
     */
   set: function(color) {
        return new Promise(function(resolve, reject) {
            try {
				console.log('Setting background color to:', color);
                // Check if we're in a browser environment
                    // Set background color
					window.parent.document.body.style.backgroundColor= color;

                    console.log('Background color set to:', window.parent.document.body.style.backgroundColor);
                    resolve();
                
            } catch (error) {
                reject(error);
            }
        });
    },
    /**
     * Required for telemetry.
     */
   get: function() {
        return new Promise(function(resolve, reject) {
            try {
                console.log('Getting background color...');
                
                // Check if we're in a browser environment
                if (typeof document !== 'undefined' && document.body) {
                    var currentBackgroundColor = document.body.style.backgroundColor || 'white';
                    console.log('Current background color:', currentBackgroundColor);
                    
                    resolve({
                        backgroundColor: window.parent.document.body.style.backgroundColor,
                        saturation: 0.5 // placeholder value for compatibility
                    });
                } else {
                    reject(new Error('Document or body element is not available'));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
};

// Make it available globally if needed
if (typeof window !== 'undefined') {
    window.plugin = colorTemperatureModule;
}