<template>
    <div class="min-h-screen flex overflow-x-hidden">
        <!-- Sidebar -->
        <AdminSidebar />

        <!-- Main Content -->
        <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
            <!-- Top Bar -->
            <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4 sticky top-0 z-10">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="ml-14 lg:ml-0">
                        <h1 class="text-xl font-semibold text-neutral-900">Admin Dashboard</h1>
                        <p class="text-sm text-neutral-500">Platform overview and key metrics</p>
                    </div>
                    <div class="text-sm text-neutral-600">
                        <span class="font-medium">{{ adminAuthStore.currentAdmin?.username }}</span>
                    </div>
                </div>
            </header>

            <!-- Dashboard Content -->
            <div class="p-4 sm:p-6">
                <!-- Stats Overview -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <!-- Unverified Technicians -->
                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-neutral-500 mb-1">Pending Verification</p>
                                    <p class="text-2xl font-bold text-neutral-900">{{ unverifiedCount }}</p>
                                </div>
                                <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <router-link to="/admin/technicians/verification"
                                class="text-xs text-primary-600 hover:underline mt-2 inline-block">
                                View Queue →
                            </router-link>
                        </div>
                    </div>

                    <!-- Unpaid Bookings -->
                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-neutral-500 mb-1">Unpaid Bookings</p>
                                    <p class="text-2xl font-bold text-neutral-900">{{ unpaidCount }}</p>
                                </div>
                                <div class="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-error-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <router-link to="/admin/bookings/unpaid"
                                class="text-xs text-primary-600 hover:underline mt-2 inline-block">
                                View Details →
                            </router-link>
                        </div>
                    </div>

                    <!-- Incomplete Bookings -->
                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-neutral-500 mb-1">Incomplete Bookings</p>
                                    <p class="text-2xl font-bold text-neutral-900">{{ incompleteCount }}</p>
                                </div>
                                <div class="w-12 h-12 bg-info-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-info-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <router-link to="/admin/bookings/incomplete"
                                class="text-xs text-primary-600 hover:underline mt-2 inline-block">
                                View Details →
                            </router-link>
                        </div>
                    </div>

                    <!-- Overdue Bookings -->
                    <div class="card">
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-neutral-500 mb-1">Overdue Bookings</p>
                                    <p class="text-2xl font-bold text-neutral-900">{{ overdueCount }}</p>
                                </div>
                                <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <router-link to="/admin/bookings/overdue"
                                class="text-xs text-primary-600 hover:underline mt-2 inline-block">
                                View Details →
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Financial Summary -->
                <div class="mb-6">
                    <h2 class="text-lg font-semibold text-neutral-900 mb-4">Financial Summary</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div
                            class="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-6 border border-success-200 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <p class="text-sm font-medium text-success-700">Total Revenue</p>
                                <svg class="w-8 h-8 text-success-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-success-700 mb-1">${{
                                formatCurrency(financialSummary.totalRevenue) }}</p>
                            <p class="text-xs text-success-600">From all completed bookings</p>
                        </div>

                        <div
                            class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <p class="text-sm font-medium text-primary-700">Platform Commission</p>
                                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-primary-700 mb-1">${{
                                formatCurrency(financialSummary.totalPlatformCommission) }}</p>
                            <p class="text-xs text-primary-600">Your earnings after payouts</p>
                        </div>

                        <div
                            class="bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl p-6 border border-warning-200 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <p class="text-sm font-medium text-warning-700">Technician Earnings</p>
                                <svg class="w-8 h-8 text-warning-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-warning-700 mb-1">${{
                                formatCurrency(financialSummary.totalTechnicianEarnings) }}</p>
                            <p class="text-xs text-warning-600">Paid to service technicians</p>
                        </div>

                        <div
                            class="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 border border-neutral-200 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <p class="text-sm font-medium text-neutral-700">Completed Bookings</p>
                                <svg class="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <p class="text-3xl font-bold text-neutral-800 mb-1">{{
                                financialSummary.totalCompletedBookings || 0 }}</p>
                            <p class="text-xs text-neutral-600">Total completed bookings</p>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Recent Alerts -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Recent Alerts</h2>
                        </div>
                        <div class="card-body">
                            <div class="space-y-3">
                                <div v-if="unverifiedCount > 0"
                                    class="flex items-start gap-3 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                                    <svg class="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium text-warning-900">{{ unverifiedCount }}
                                            technician(s) awaiting verification</p>
                                        <router-link to="/admin/technicians/verification"
                                            class="text-xs text-warning-700 hover:underline">Review now</router-link>
                                    </div>
                                </div>

                                <div v-if="unpaidCount > 0"
                                    class="flex items-start gap-3 p-3 bg-error-50 border border-error-200 rounded-lg">
                                    <svg class="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium text-error-900">{{ unpaidCount }} completed
                                            booking(s) remain unpaid</p>
                                        <router-link to="/admin/bookings/unpaid"
                                            class="text-xs text-error-700 hover:underline">View details</router-link>
                                    </div>
                                </div>

                                <div v-if="incompleteCount > 0"
                                    class="flex items-start gap-3 p-3 bg-info-50 border border-info-200 rounded-lg">
                                    <svg class="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium text-info-900">{{ incompleteCount }} accepted
                                            booking(s) not completed</p>
                                        <router-link to="/admin/bookings/incomplete"
                                            class="text-xs text-info-700 hover:underline">View details</router-link>
                                    </div>
                                </div>

                                <div v-if="unverifiedCount === 0 && unpaidCount === 0 && incompleteCount === 0"
                                    class="text-center py-8">
                                    <svg class="w-12 h-12 text-success-500 mx-auto mb-3" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <p class="text-sm text-neutral-600">All systems operational</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Quick Actions</h2>
                        </div>
                        <div class="card-body">
                            <div class="grid grid-cols-1 gap-3">
                                <router-link to="/admin/appliances"
                                    class="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                                    <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-neutral-900">Add Appliance Category/Type</p>
                                        <p class="text-xs text-neutral-500">Manage appliance catalog</p>
                                    </div>
                                </router-link>

                                <router-link to="/admin/technicians/verification"
                                    class="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                                    <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-neutral-900">Verify Technicians</p>
                                        <p class="text-xs text-neutral-500">Review pending applications</p>
                                    </div>
                                </router-link>

                                <router-link to="/admin/technicians/performance"
                                    class="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                                    <div class="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-neutral-900">Technician Performance</p>
                                        <p class="text-xs text-neutral-500">Review ratings and metrics</p>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { useAdminAuthStore } from '@/store/adminAuth'
import { useAdminStore } from '@/store/admin'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'

export default {
    name: 'AdminDashboardView',
    components: {
        AdminSidebar
    },
    data() {
        return {
            unverifiedCount: 0,
            unpaidCount: 0,
            incompleteCount: 0,
            overdueCount: 0,
            financialSummary: {
                totalRevenue: '0.00',
                totalPlatformCommission: '0.00',
                totalTechnicianEarnings: '0.00',
                totalCompletedBookings: 0
            },
            loading: false,
            loadingAnalytics: false
        }
    },
    computed: {
        adminAuthStore() {
            return useAdminAuthStore()
        }
    },
    async mounted() {
        await this.loadDashboardData()
    },
    methods: {
        async loadDashboardData() {
            this.loading = true
            this.loadingAnalytics = true
            const adminStore = useAdminStore()

            try {
                // Load all data in parallel for efficiency
                const [unverified, unpaid, incomplete, overdue, financials] = await Promise.all([
                    adminStore.fetchUnverifiedTechnicians(),
                    adminStore.fetchCompletedUnpaid(7),
                    adminStore.fetchAcceptedIncomplete(3),
                    adminStore.fetchPaidOverdue(),
                    adminStore.fetchFinancials(),
                ])

                this.unverifiedCount = unverified.count || 0
                this.unpaidCount = unpaid.count || 0
                this.incompleteCount = incomplete.count || 0
                this.overdueCount = overdue.count || 0

                // Access the summary object from the response
                if (financials && financials.summary) {
                    // Backend returns strings from .toFixed(2), so we need to store them as-is
                    this.financialSummary = {
                        totalRevenue: financials.summary.totalRevenue || '0.00',
                        totalPlatformCommission: financials.summary.totalPlatformCommission || '0.00',
                        totalTechnicianEarnings: financials.summary.totalTechnicianEarnings || '0.00',
                        totalCompletedBookings: financials.summary.totalCompletedBookings || 0
                    }
                }
            } catch (error) {
                console.error('Error loading dashboard data:', error)
            } finally {
                this.loading = false
                this.loadingAnalytics = false
            }
        },
        formatCurrency(value) {
            // Backend returns strings from .toFixed(2), so check if it's already a string
            if (typeof value === 'string') {
                // Already formatted, just ensure it has proper thousand separators
                const num = parseFloat(value) || 0
                return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
            const num = parseFloat(value) || 0
            return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }
    }
}
</script>
