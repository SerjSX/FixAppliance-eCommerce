<template>
    <div class="min-h-screen flex overflow-x-hidden">
        <AdminSidebar />

        <main class="flex-1 lg:ml-64 bg-neutral-50 min-h-screen w-full overflow-x-hidden">
            <!-- Top Bar -->
            <header class="bg-white border-b border-neutral-100 px-4 sm:px-6 py-4 sticky top-0 z-10">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-xl font-semibold text-neutral-900">Technician Details</h1>
                        <p class="text-sm text-neutral-500">View and manage technician information</p>
                    </div>
                    <button @click="$router.back()" class="btn btn-secondary">
                        ← Back
                    </button>
                </div>
            </header>

            <div class="p-4 sm:p-6">
                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="alert alert-error">
                    {{ error }}
                </div>

                <!-- Technician Details -->
                <div v-else-if="technician" class="space-y-6">
                    <!-- Header Card with Actions -->
                    <div class="card">
                        <div class="card-body">
                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h2 class="text-2xl font-bold text-neutral-900">
                                        {{ technician.First_Name }} {{ technician.Last_Name }}
                                    </h2>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <span :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            technician.Verified
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        ]">
                                            {{ technician.Verified ? '✓ Verified' : '⚠ Not Verified' }}
                                        </span>
                                        <span :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            technician.isActive
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-red-100 text-red-800'
                                        ]">
                                            {{ technician.isActive ? 'Active' : 'Deactivated' }}
                                        </span>
                                        <span
                                            class="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                            ⭐ {{ technician.Average_Rating ? technician.Average_Rating.toFixed(2) :
                                                '0.00' }}/5
                                        </span>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex flex-wrap gap-2">
                                    <button v-if="!technician.Verified" @click="verifyTechnician"
                                        :disabled="actionLoading" class="btn btn-success">
                                        {{ actionLoading ? 'Processing...' : '✓ Verify' }}
                                    </button>
                                    <button v-if="technician.Verified" @click="revokeVerification"
                                        :disabled="actionLoading" class="btn btn-warning">
                                        {{ actionLoading ? 'Processing...' : '⚠ Revoke Verification' }}
                                    </button>
                                    <button v-if="technician.isActive" @click="showDeactivateModal = true"
                                        :disabled="actionLoading" class="btn btn-danger">
                                        🚫 Deactivate Account
                                    </button>
                                    <button v-else @click="activateAccount" :disabled="actionLoading"
                                        class="btn btn-primary">
                                        {{ actionLoading ? 'Activating...' : '✓ Activate Account' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Contact Information</h3>
                        </div>
                        <div class="card-body">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-medium text-neutral-600">Email</label>
                                    <p class="text-neutral-900 mt-1">{{ technician.Email }}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-neutral-600">Phone</label>
                                    <p class="text-neutral-900 mt-1">{{ technician.Phone }}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-neutral-600">Registration Date</label>
                                    <p class="text-neutral-900 mt-1">{{ formatDate(technician.createdAt) }}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-neutral-600">Technician ID</label>
                                    <p class="text-neutral-900 mt-1">#{{ technician.Technician_ID }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Statistics -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="text-3xl font-bold text-primary-600">{{ technician.Total_Jobs || 0 }}</div>
                                <div class="text-sm text-neutral-600 mt-1">Total Jobs</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="text-3xl font-bold text-green-600">{{ technician.Completed_Bookings || 0 }}
                                </div>
                                <div class="text-sm text-neutral-600 mt-1">Completed Bookings</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="text-3xl font-bold text-blue-600">{{ technician.Specialties_Count || 0 }}
                                </div>
                                <div class="text-sm text-neutral-600 mt-1">Specialties</div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body text-center">
                                <div class="text-3xl font-bold text-purple-600">{{ technician.Service_Areas_Count || 0
                                }}</div>
                                <div class="text-sm text-neutral-600 mt-1">Service Areas</div>
                            </div>
                        </div>
                    </div>

                    <!-- Performance Metrics -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Performance Metrics</h3>
                        </div>
                        <div class="card-body">
                            <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-sm font-medium text-neutral-600">Average Rating</span>
                                        <span class="text-sm font-bold text-neutral-900">
                                            {{ technician.Average_Rating ? technician.Average_Rating.toFixed(2) : '0.00'
                                            }}/5.00
                                        </span>
                                    </div>
                                    <div class="w-full bg-neutral-200 rounded-full h-3">
                                        <div class="h-3 rounded-full transition-all"
                                            :class="getRatingColor(technician.Average_Rating)"
                                            :style="{ width: `${(technician.Average_Rating || 0) * 20}%` }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Alert Messages -->
                    <div v-if="successMessage" class="alert alert-success">
                        {{ successMessage }}
                    </div>
                    <div v-if="actionError" class="alert alert-error">
                        {{ actionError }}
                    </div>
                </div>
            </div>
        </main>

        <!-- Deactivate Confirmation Modal -->
        <BaseModal v-if="showDeactivateModal" @close="showDeactivateModal = false"
            title="Deactivate Technician Account">
            <div class="space-y-4 p-4">
                <p class="text-neutral-700">
                    Are you sure you want to deactivate
                    <strong>{{ technician?.First_Name }} {{ technician?.Last_Name }}</strong>'s account?
                </p>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p class="text-sm text-yellow-800">
                        ⚠ This will prevent the technician from:
                    </p>
                    <ul class="list-disc list-inside text-sm text-yellow-800 mt-2 space-y-1">
                        <li>Logging into their account</li>
                        <li>Accepting new bookings</li>
                        <li>Accessing their dashboard</li>
                    </ul>
                </div>
                <div class="flex justify-end gap-3 mt-6">
                    <button @click="showDeactivateModal = false" class="btn btn-secondary">
                        Cancel
                    </button>
                    <button @click="confirmDeactivateAccount" :disabled="actionLoading" class="btn btn-danger">
                        {{ actionLoading ? 'Deactivating...' : 'Deactivate Account' }}
                    </button>
                </div>
            </div>
        </BaseModal>


    </div>
</template>

<script>
import { adminApi } from '@/api/adminApi'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import BaseModal from '@/components/common/BaseModal.vue'

export default {
    name: 'AdminTechnicianDetailsView',
    components: {
        AdminSidebar,
        BaseModal
    },
    data() {
        return {
            technician: null,
            loading: false,
            error: null,
            actionLoading: false,
            actionError: null,
            successMessage: null,
            showDeactivateModal: false,
            showActivateModal: false
        }
    },
    computed: {
        technicianId() {
            return this.$route.params.id
        }
    },
    async mounted() {
        await this.fetchTechnicianDetails()
    },
    methods: {
        async fetchTechnicianDetails() {
            this.loading = true
            this.error = null
            try {
                const { data } = await adminApi.getTechnicianDetails(this.technicianId)
                this.technician = data.data
            } catch (err) {
                this.error = err.response?.data?.message || 'Failed to load technician details'
            } finally {
                this.loading = false
            }
        },
        async verifyTechnician() {
            this.actionLoading = true
            this.actionError = null
            this.successMessage = null
            try {
                await adminApi.verifyTechnician(this.technicianId)
                this.successMessage = 'Technician verified successfully!'
                await this.fetchTechnicianDetails()
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (err) {
                this.actionError = err.response?.data?.message || 'Failed to verify technician'
            } finally {
                this.actionLoading = false
            }
        },
        async revokeVerification() {
            this.actionLoading = true
            this.actionError = null
            this.successMessage = null
            try {
                await adminApi.revokeVerification(this.technicianId)
                this.successMessage = 'Verification revoked successfully!'
                await this.fetchTechnicianDetails()
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (err) {
                this.actionError = err.response?.data?.message || 'Failed to revoke verification'
            } finally {
                this.actionLoading = false
            }
        },
        async confirmDeactivateAccount() {
            this.actionLoading = true
            this.actionError = null
            this.successMessage = null
            try {
                await adminApi.deactivateTechnician(this.technicianId)
                this.showDeactivateModal = false
                this.successMessage = 'Account deactivated successfully!'
                await this.fetchTechnicianDetails()
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (err) {
                this.actionError = err.response?.data?.message || 'Failed to deactivate account'
                this.showDeactivateModal = false
            } finally {
                this.actionLoading = false
            }
        },
        async activateAccount() {
            this.actionLoading = true
            this.actionError = null
            this.successMessage = null
            try {
                await adminApi.activateTechnician(this.technicianId)
                this.showActivateModal = false
                this.successMessage = 'Account activated successfully!'
                await this.fetchTechnicianDetails()
                setTimeout(() => { this.successMessage = null }, 3000)
            } catch (err) {
                this.actionError = err.response?.data?.message || 'Failed to activate account'
                this.showActivateModal = false
            } finally {
                this.actionLoading = false
            }
        },
        formatDate(dateString) {
            if (!dateString) return 'N/A'
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },
        getRatingColor(rating) {
            if (!rating || rating === 0) return 'bg-neutral-400'
            if (rating < 2) return 'bg-red-500'
            if (rating < 3) return 'bg-orange-500'
            if (rating < 4) return 'bg-yellow-500'
            return 'bg-green-500'
        }
    }
}
</script>
