<template>
    <div class="min-h-screen flex overflow-x-hidden">
        <AdminSidebar />

        <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
            <!-- Top Bar -->
            <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4 sticky top-0 z-10">
                <div class="ml-14 lg:ml-0">
                    <h1 class="text-xl font-semibold text-neutral-900">Manage Technicians</h1>
                    <p class="text-sm text-neutral-500">View, search, and manage all technician accounts</p>
                </div>

            </header>

            <div class="p-4 sm:p-6">
                <!-- Success/Error Messages -->
                <AlertMessage v-if="successMessage" type="success" :message="successMessage" class="mb-6"
                    @dismiss="successMessage = null" />

                <AlertMessage v-if="errorMessage" type="error" :message="errorMessage" class="mb-6"
                    @dismiss="errorMessage = null" />

                <!-- Filters and Search -->
                <div class="card mb-6">
                    <div class="card-body">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <!-- Search -->
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-neutral-700 mb-2">Search</label>
                                <input v-model="searchQuery" type="text" placeholder="Search by name or email..."
                                    class="input w-full" @input="debouncedSearch" />
                            </div>

                            <!-- Status Filter -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                                <select v-model="statusFilter" @change="applyFilters"
                                    class="select bg-white rounded-md hover:bg-gray-100 hover:cursor-pointer hover:transition hover:ease-in-out hover:duration-300 p-5 w-full">
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <!-- Verification Filter -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 mb-2">Verification</label>
                                <select v-model="verifiedFilter" @change="applyFilters"
                                    class="select bg-white rounded-md hover:bg-gray-100 hover:cursor-pointer hover:transition hover:ease-in-out hover:duration-300 p-5 w-full">
                                    <option value="all">All</option>
                                    <option value="verified">Verified</option>
                                    <option value="unverified">Unverified</option>
                                </select>
                            </div>
                        </div>

                        <!-- Clear Filters -->
                        <div class="mt-4 flex justify-end">
                            <button type="button" @click="clearFilters"
                                class="text-sm text-neutral-600 hover:text-neutral-900">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Technicians Table -->
                <div class="card">
                    <div class="card-body p-0">
                        <!-- Loading State -->
                        <div v-if="loading" class="p-8 text-center">
                            <div class="inline-block animate-spin">
                                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-else-if="technicians.length === 0" class="p-8 text-center text-neutral-500">
                            <svg class="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                            <p>No technicians found</p>
                        </div>

                        <!-- Table -->
                        <div v-else class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-neutral-50 border-b border-neutral-200">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">
                                            Technician</th>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Contact
                                        </th>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Rating
                                        </th>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Jobs</th>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Status
                                        </th>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Verified
                                        </th>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-neutral-100">
                                    <tr v-for="tech in technicians" :key="tech.Technician_ID"
                                        class="hover:bg-neutral-50">
                                        <!-- Technician Name -->
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-3">
                                                <span class="avatar avatar-sm bg-primary-100 text-primary-600">
                                                    {{ getTechnicianInitials(tech) }}
                                                </span>
                                                <div>
                                                    <p class="font-medium text-neutral-900">
                                                        {{ tech.First_Name }} {{ tech.Last_Name }}
                                                    </p>
                                                    <p class="text-xs text-neutral-500">ID: {{ tech.Technician_ID }}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <!-- Contact -->
                                        <td class="px-4 py-3">
                                            <p class="text-sm text-neutral-900">{{ tech.Email }}</p>
                                            <p class="text-xs text-neutral-500">{{ tech.Phone }}</p>
                                        </td>

                                        <!-- Rating -->
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-1">
                                                <svg class="w-4 h-4 text-warning-500" fill="currentColor"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                                    </path>
                                                </svg>
                                                <span class="text-sm font-medium text-neutral-900">{{
                                                    formatRating(tech.Average_Rating) }}</span>
                                            </div>
                                        </td>

                                        <!-- Jobs -->
                                        <td class="px-4 py-3">
                                            <p class="text-sm text-neutral-900">{{ tech.Total_Bookings || 0 }}</p>
                                            <p class="text-xs text-neutral-500">{{ tech.Completed_Bookings || 0 }}
                                                completed</p>
                                        </td>

                                        <!-- Status -->
                                        <td class="px-4 py-3">
                                            <span :class="[
                                                'badge',
                                                tech.isActive ? 'badge-success' : 'badge-error'
                                            ]">
                                                {{ tech.isActive ? 'Active' : 'Inactive' }}
                                            </span>
                                        </td>

                                        <!-- Verified -->
                                        <td class="px-4 py-3">
                                            <span :class="[
                                                'badge',
                                                tech.Verified ? 'badge-primary' : 'badge-warning'
                                            ]">
                                                {{ tech.Verified ? 'Verified' : 'Pending' }}
                                            </span>
                                        </td>

                                        <!-- Actions -->
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <!-- View Details -->
                                                <button type="button" @click="viewDetails(tech.Technician_ID)"
                                                    class="btn btn-secondary btn-sm" title="View Details">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                                        </path>
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                                        </path>
                                                    </svg>
                                                </button>

                                                <!-- Verify/Revoke -->
                                                <button v-if="!tech.Verified" type="button"
                                                    @click="handleVerify(tech.Technician_ID)"
                                                    class="btn btn-success btn-sm" :disabled="actionLoading"
                                                    title="Verify Technician">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </button>
                                                <button v-else type="button"
                                                    @click="handleRevokeVerification(tech.Technician_ID)"
                                                    class="btn btn-warning btn-sm" :disabled="actionLoading"
                                                    title="Revoke Verification">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636">
                                                        </path>
                                                    </svg>
                                                </button>

                                                <!-- Activate/Deactivate -->
                                                <button v-if="!tech.isActive" type="button"
                                                    @click="handleActivate(tech.Technician_ID)"
                                                    class="btn btn-primary btn-sm" :disabled="actionLoading"
                                                    title="Activate Account">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </button>
                                                <button v-else type="button"
                                                    @click="handleDeactivate(tech.Technician_ID)"
                                                    class="btn btn-error btn-sm" :disabled="actionLoading"
                                                    title="Deactivate Account">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div v-if="pagination.pages > 1"
                            class="px-4 py-3 border-t border-neutral-200 flex items-center justify-between">
                            <div class="text-sm text-neutral-600">
                                Showing {{ (pagination.page - 1) * pagination.limit + 1 }} -
                                {{ Math.min(pagination.page * pagination.limit, pagination.total) }}
                                of {{ pagination.total }} technicians
                            </div>
                            <div class="flex gap-2">
                                <button type="button" @click="changePage(pagination.page - 1)"
                                    :disabled="pagination.page === 1" class="btn btn-secondary btn-sm">
                                    Previous
                                </button>
                                <button type="button" @click="changePage(pagination.page + 1)"
                                    :disabled="pagination.page >= pagination.pages" class="btn btn-secondary btn-sm">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Confirmation Modals -->
        <BaseModal v-if="showDeactivateModal" @close="showDeactivateModal = false" title="Deactivate Technician">
            <div class="p-6">
                <p class="text-neutral-700 mb-4">
                    Are you sure you want to deactivate this technician? They will not be able to accept new bookings.
                </p>
                <div class="flex justify-end gap-3">
                    <button type="button" @click="showDeactivateModal = false" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="button" @click="confirmDeactivate" class="btn btn-error" :disabled="actionLoading">
                        {{ actionLoading ? 'Deactivating...' : 'Deactivate' }}
                    </button>
                </div>
            </div>

        </BaseModal>

        <BaseModal v-if="showActivateModal" @close="showActivateModal = false" title="Activate Technician">
            <div class="p-6">
                <p class="text-neutral-700 mb-4">
                    Are you sure you want to activate this technician? They will be able to accept bookings again.
                </p>
                <div class="flex justify-end gap-3">
                    <button type="button" @click="showActivateModal = false" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="button" @click="confirmActivate" class="btn btn-primary" :disabled="actionLoading">
                        {{ actionLoading ? 'Activating...' : 'Activate' }}
                    </button>
                </div>
            </div>

        </BaseModal>

        <BaseModal v-if="showVerifyModal" @close="showVerifyModal = false" title="Verify Technician">
            <div class="p-6">
                <p class="text-neutral-700 mb-4">
                    Are you sure you want to verify this technician? This will approve them to accept bookings.
                </p>
                <div class="flex justify-end gap-3">
                    <button type="button" @click="showVerifyModal = false" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="button" @click="confirmVerify" class="btn btn-success" :disabled="actionLoading">
                        {{ actionLoading ? 'Verifying...' : 'Verify' }}
                    </button>
                </div>
            </div>

        </BaseModal>

        <BaseModal v-if="showRevokeModal" @close="showRevokeModal = false" title="Revoke Verification">
            <div class="p-6">
                <p class="text-neutral-700 mb-4">
                    Are you sure you want to revoke verification for this technician? They may need to be re-verified
                    later.
                </p>
                <div class="flex justify-end gap-3">
                    <button type="button" @click="showRevokeModal = false" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="button" @click="confirmRevokeVerification" class="btn btn-warning"
                        :disabled="actionLoading">
                        {{ actionLoading ? 'Revoking...' : 'Revoke' }}
                    </button>
                </div>
            </div>

        </BaseModal>
    </div>
</template>

<script>
import { useAdminStore } from '@/store/admin'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AlertMessage from '@/components/common/AlertMessage.vue'
import BaseModal from '@/components/common/BaseModal.vue'

export default {
    name: 'AdminTechniciansView',
    components: {
        AdminSidebar,
        AlertMessage,
        BaseModal
    },
    data() {
        return {
            adminStore: useAdminStore(),
            loading: false,
            actionLoading: false,
            successMessage: null,
            errorMessage: null,
            searchQuery: '',
            statusFilter: 'all',
            verifiedFilter: 'all',
            currentPage: 1,
            showDeactivateModal: false,
            showActivateModal: false,
            showVerifyModal: false,
            showRevokeModal: false,
            selectedTechnicianId: null,
            searchTimeout: null
        }
    },
    computed: {
        technicians() {
            return this.adminStore.allTechnicians
        },
        pagination() {
            return this.adminStore.techniciansPagination
        }
    },
    async mounted() {
        this.resetModals()
        await this.fetchTechnicians()
    },
    watch: {
        '$route'() {
            this.resetModals()
        }
    },
    methods: {
        resetModals() {
            this.showDeactivateModal = false
            this.showActivateModal = false
            this.showVerifyModal = false
            this.showRevokeModal = false
            this.selectedTechnicianId = null
        },
        async fetchTechnicians() {
            this.loading = true
            this.errorMessage = null
            try {
                await this.adminStore.fetchAllTechnicians({
                    status: this.statusFilter,
                    verified: this.verifiedFilter,
                    search: this.searchQuery,
                    page: this.currentPage,
                    limit: 20
                })
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Failed to fetch technicians'
            } finally {
                this.loading = false
            }
        },
        debouncedSearch() {
            clearTimeout(this.searchTimeout)
            this.searchTimeout = setTimeout(() => {
                this.currentPage = 1
                this.fetchTechnicians()
            }, 500)
        },
        applyFilters() {
            this.currentPage = 1
            this.fetchTechnicians()
        },
        clearFilters() {
            this.searchQuery = ''
            this.statusFilter = 'all'
            this.verifiedFilter = 'all'
            this.currentPage = 1
            this.fetchTechnicians()
        },
        changePage(page) {
            this.currentPage = page
            this.fetchTechnicians()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        getTechnicianInitials(tech) {
            return `${tech.First_Name[0]}${tech.Last_Name[0]}`.toUpperCase()
        },
        formatRating(rating) {
            return parseFloat(rating || 0).toFixed(1)
        },
        viewDetails(technicianId) {
            this.$router.push({ name: 'AdminTechnicianDetails', params: { id: technicianId } })
        },
        handleDeactivate(technicianId) {
            this.selectedTechnicianId = technicianId
            this.showDeactivateModal = true
        },
        async confirmDeactivate() {
            this.actionLoading = true
            this.errorMessage = null
            this.successMessage = null
            try {
                await this.adminStore.deactivateTechnician(this.selectedTechnicianId)
                this.showDeactivateModal = false
                this.successMessage = 'Technician deactivated successfully'
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Failed to deactivate technician'
                this.showDeactivateModal = false
            } finally {
                this.actionLoading = false
            }
        },
        handleActivate(technicianId) {
            this.selectedTechnicianId = technicianId
            this.showActivateModal = true
        },
        async confirmActivate() {
            this.actionLoading = true
            this.errorMessage = null
            this.successMessage = null
            try {
                await this.adminStore.activateTechnician(this.selectedTechnicianId)
                this.showActivateModal = false
                this.successMessage = 'Technician activated successfully'
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Failed to activate technician'
                this.showActivateModal = false
            } finally {
                this.actionLoading = false
            }
        },
        handleVerify(technicianId) {
            this.selectedTechnicianId = technicianId
            this.showVerifyModal = true
        },
        async confirmVerify() {
            this.actionLoading = true
            this.errorMessage = null
            this.successMessage = null
            try {
                await this.adminStore.verifyTechnicianFromList(this.selectedTechnicianId)
                this.showVerifyModal = false
                this.successMessage = 'Technician verified successfully'
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Failed to verify technician'
                this.showVerifyModal = false
            } finally {
                this.actionLoading = false
            }
        },
        handleRevokeVerification(technicianId) {
            this.selectedTechnicianId = technicianId
            this.showRevokeModal = true
        },
        async confirmRevokeVerification() {
            this.actionLoading = true
            this.errorMessage = null
            this.successMessage = null
            try {
                await this.adminStore.revokeVerificationFromList(this.selectedTechnicianId)
                this.showRevokeModal = false
                this.successMessage = 'Verification revoked successfully'
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Failed to revoke verification'
                this.showRevokeModal = false
            } finally {
                this.actionLoading = false
            }
        }
    }
}
</script>
