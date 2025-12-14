// Technician data store (specialties, service areas, bookings, earnings)
import { defineStore } from 'pinia'
import { technicianApi } from '@/api'

export const useTechnicianStore = defineStore('technician', {
  state: () => ({
    specialties: [],
    serviceAreas: [],
    pendingBookings: [],
    activeBookings: [],
    completedBookings: [],
    earnings: null,
    loading: false,
    error: null
  }),

  getters: {
    specialtyIds: (state) => state.specialties.map(s => s.id),
    serviceAreaIds: (state) => state.serviceAreas.map(a => a.id),
    confirmedBookings: (state) => state.activeBookings.filter(b => b.status === 'confirmed'),
    inProgressBookings: (state) => state.activeBookings.filter(b => b.status === 'in_progress')
  },

  actions: {
    // Specialties
    async fetchSpecialties() {
      this.loading = true
      try {
        const { data } = await technicianApi.getSpecialties()
        // Normalize backend field names to frontend format
        const rawSpecialties = data?.specialties || data?.data || data || []
        this.specialties = rawSpecialties.map(spec => ({
          id: spec.categoryId,
          name: spec.nameEN,
          nameAr: spec.nameAR,
          description: spec.description,
          yearsOfExperience: spec.yearsOfExperience,
          certificationDate: spec.certificateDate
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addSpecialty(categoryId, yearsOfExperience = 0, certificateDate = null) {
      try {
        await technicianApi.addSpecialty(categoryId, yearsOfExperience, certificateDate)
        await this.fetchSpecialties()
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    async removeSpecialty(categoryId) {
      try {
        await technicianApi.removeSpecialty(categoryId)
        this.specialties = this.specialties.filter(s => s.categoryId !== categoryId && s.id !== categoryId)
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    // Service Areas
    async fetchServiceAreas() {
      this.loading = true
      try {
        const { data } = await technicianApi.getServiceAreas()
        // Normalize backend field names to frontend format
        const rawAreas = data?.serviceAreas || []
        this.serviceAreas = rawAreas.map(area => ({
          id: area.areaId,
          name: area.nameEN,
          nameAr: area.nameAR,
          region: area.region,
          priority: area.priority
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async addServiceArea(areaId, priority = 1) {
      try {
        await technicianApi.addServiceArea(areaId, priority)
        await this.fetchServiceAreas()
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    async removeServiceArea(areaId) {
      try {
        await technicianApi.removeServiceArea(areaId)
        this.serviceAreas = this.serviceAreas.filter(a => a.serviceAreaId !== areaId && a.id !== areaId)
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    // Bookings
    async fetchPendingBookings() {
      this.loading = true
      try {
        const { data } = await technicianApi.getPendingBookings()
        const rawBookings = data?.bookings || []
        this.pendingBookings = rawBookings.map(booking => ({
          id: booking.Booking_ID,
          scheduledDate: booking['Scheduled Date'],
          scheduledTime: booking['Scheduled Time'],
          totalPrice: booking['Total Price'],
          applianceName: booking["Appliance's Name (EN)"],
          applianceNameAr: booking["Appliance's Name (AR)"],
          issueDescription: booking['Issue Description'],
          customerFirstName: booking['First Name'],
          customerLastName: booking['Last Name'],
          customerName: `${booking['First Name']} ${booking['Last Name']}`.trim(),
          customerPhone: booking['Phone Number'],
          city: booking.City,
          streetAddress: booking['Street Address'],
          buildingName: booking['Building Name'],
          floor: booking['Building Floor'],
          postalCode: booking['Postal Code'],
          serviceArea: booking.City
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async acceptBooking(bookingId) {
      try {
        await technicianApi.acceptBooking(bookingId)
        // Move booking from pending to active
        const booking = this.pendingBookings.find(b => b.id === bookingId)
        if (booking) {
          this.pendingBookings = this.pendingBookings.filter(b => b.id !== bookingId)
          booking.status = 'confirmed'
          this.activeBookings.push(booking)
        }
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    async declineBooking(bookingId) {
      try {
        await technicianApi.declineBooking(bookingId)
        this.pendingBookings = this.pendingBookings.filter(b => b.id !== bookingId)
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    // Active Bookings (confirmed + in_progress)
    async fetchActiveBookings() {
      this.loading = true
      try {
        const { data } = await technicianApi.getActiveBookings()
        const rawBookings = data?.bookings || []
        this.activeBookings = rawBookings.map(booking => ({
          id: booking.Booking_ID,
          status: booking.Status,
          scheduledDate: booking['Scheduled Date'],
          scheduledTime: booking['Scheduled Time'],
          totalPrice: booking['Total Price'],
          applianceName: booking["Appliance's Name (EN)"],
          applianceNameAr: booking["Appliance's Name (AR)"],
          issueDescription: booking['Issue Description'],
          customerFirstName: booking['First Name'],
          customerLastName: booking['Last Name'],
          customerName: `${booking['First Name']} ${booking['Last Name']}`.trim(),
          customerPhone: booking['Phone Number'],
          city: booking.City,
          streetAddress: booking['Street Address'],
          buildingName: booking['Building Name'],
          floor: booking['Building Floor'],
          postalCode: booking['Postal Code'],
          paymentStatus: booking['Payment Status'],
          paymentMethod: booking['Payment Method'],
          transactionId: booking['Transaction ID']
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    // Completed Bookings
    async fetchCompletedBookings() {
      this.loading = true
      try {
        const { data } = await technicianApi.getCompletedBookings()
        const rawBookings = data?.bookings || []
        this.completedBookings = rawBookings.map(booking => ({
          id: booking.Booking_ID,
          status: booking.Status,
          scheduledDate: booking['Scheduled Date'],
          scheduledTime: booking['Scheduled Time'],
          completedAt: booking['Completed At'],
          totalPrice: booking['Total Price'],
          applianceName: booking["Appliance's Name (EN)"],
          applianceNameAr: booking["Appliance's Name (AR)"],
          issueDescription: booking['Issue Description'],
          customerFirstName: booking['First Name'],
          customerLastName: booking['Last Name'],
          customerName: `${booking['First Name']} ${booking['Last Name']}`.trim(),
          city: booking.City,
          rating: booking.Rating,
          review: booking.Review,
          paymentStatus: booking['Payment Status'],
          paymentMethod: booking['Payment Method'],
          transactionId: booking['Transaction ID']
        }))
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async startBooking(bookingId) {
      try {
        await technicianApi.startBooking(bookingId)
        // Update booking status in activeBookings
        const booking = this.activeBookings.find(b => b.id === bookingId)
        if (booking) {
          booking.status = 'in_progress'
        }
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    async completeBooking(bookingId) {
      try {
        await technicianApi.completeBooking(bookingId)
        // Move booking from active to completed
        const booking = this.activeBookings.find(b => b.id === bookingId)
        if (booking) {
          this.activeBookings = this.activeBookings.filter(b => b.id !== bookingId)
          booking.status = 'completed'
          booking.completedAt = new Date().toISOString()
          this.completedBookings.unshift(booking)
        }
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    // Earnings
    async fetchEarnings() {
      this.loading = true
      try {
        const { data } = await technicianApi.getEarnings()
        // Handle both formats - data could have summary property or be the summary directly
        this.earnings = {
          summary: data?.summary || data || {},
          monthlyBreakdown: data?.monthlyBreakdown || []
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
