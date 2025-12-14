import {ref, onMounted, onUnmounted} from 'vue';

/**
 * This JS file is responsible for smart polling while respecting tab changes.
 * 
 * When the user switches to another tab, polling pauses to save batter and bandwidth.
 * Resumes automatically when the user comes back.
 * 
 * An example of how to use it:
 *  const {isRefreshing, lastUpdated, startAutoRefresh, stopAutoRefresh} = useAutoRefresh()
 * 
 *  mounted() {
 *      this.startAutoRefresh(async () => {
 *          await bookingStore.fetchAll()
 *      }, 15000)
 * }
 * 
 *  unmounted() {
 *      this.stopAutoRefresh()
 * }
 */

export function useAutoRefresh() {
    // The state, this is reactive so Vue can know and track whenever the values of these 2 vars change.
    const isRefreshing = ref(false)
    const lastUpdated = ref(null)

    // Internal variables, not reactive
    let refreshInterval = null
    let refreshCallback = null

    // This runs whenever document visibiity changes (user switches tabs, minmizes windows...)
    const handleVisibilityChange = () => {
        if (document.hidden) {
            // If tab is hidden, stop polling
            if (refreshInterval) {
                clearInterval(refreshInterval)
                refreshInterval = null
            } 
        } else {
            // if tab is visible, start polling again
            if (refreshCallback) {
                startAutoRefresh(refreshCallback.fn, refreshCallback.interval)
            }
        }
    }

    // Starts the auto-refreshing polling, this is called from a component's mounted() vue hook
    // By default, refreshes once per 15 seconds
    // callback is the async function to call on each refresh
    const startAutoRefresh = (callback, interval = 15000) => {
        // Clear any existing interval to prevent duplicates
        if (refreshInterval) {
            clearInterval(refreshInterval)
            refreshInterval = null
        }

        // Used to restart the refresh once the tab becomes visible
        refreshCallback = { fn: callback, interval }

        // Running it once first
        callback()

        // Only set up interval if the tab is currently visible
        if (!document.hidden) {
            refreshInterval = setInterval(async () => {
                isRefreshing.value = true

                try {
                    await callback()
                    lastUpdated.value = new Date()
                } catch (error) {
                    console.error('Auto-refresh error:', error)
                    // error only logs, does not stop the polling
                } finally {
                    isRefreshing.value = false
                }
            }, interval)
        }
    }

    // Stop the polling, called in unmounted()
    const stopAutoRefresh = () => {
        if (refreshInterval) {
            clearInterval(refreshInterval)
            refreshInterval = null
        }
        refreshCallback = null
    }

    // Setup listener when any component mounts and it's using this autoRefresh
    onMounted(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange)
    })

    // Clean up everything when a component unmounts, or else there would be memory leak!
    onUnmounted(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        stopAutoRefresh()
    })

    // Returning what a component can use
    return {
        isRefreshing, //to know whether it's refreshing
        lastUpdated, // to know the last update's date
        startAutoRefresh, // function to start the polling
        stopAutoRefresh // function to stop it, this is optional though it should stop on its own on unmount already
    }

}