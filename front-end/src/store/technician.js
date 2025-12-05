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
          id: spec.categoryId || spec.Category_ID || spec.id,
          categoryId: spec.categoryId || spec.Category_ID || spec.id,
          name: spec.nameEN || spec.NameEN || spec.name,
          nameAr: spec.nameAR || spec.NameAR || spec.nameAr,
          description: spec.description || spec.Description,
          yearsOfExperience: spec.yearsOfExperience || spec.Years_Of_Experience,
          certificationDate: spec.certificationDate || spec.Certification_Date
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
        const rawAreas = data?.serviceAreas || data?.data || data || []
        this.serviceAreas = rawAreas.map(area => ({
          id: area.areaId || area.Area_ID || area.id,
          serviceAreaId: area.areaId || area.Area_ID || area.id,
          name: area.nameEN || area.NameEN || area.name,
          nameAr: area.nameAR || area.NameAR || area.nameAr,
          region: area.region || area.Region,
          priority: area.priority || area.Priority_Order
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
        // Normalize backend field names to frontend format
        const rawBookings = data?.bookings || data?.data || data || []
        this.pendingBookings = rawBookings.map(booking => ({
          id: booking.Booking_ID || booking.id,
          scheduledDate: booking['Scheduled Date'] || booking.scheduledDate,
          scheduledTime: booking['Scheduled Time'] || booking.scheduledTime,
          totalPrice: booking['Total Price'] || booking.totalPrice,
          applianceName: booking["Appliance's Name (EN)"] || booking.applianceName,
          applianceNameAr: booking["Appliance's Name (AR)"] || booking.applianceNameAr,
          issueDescription: booking['Issue Description'] || booking.issueDescription,
          customerFirstName: booking['First Name'] || booking.customerFirstName,
          customerLastName: booking['Last Name'] || booking.customerLastName,
          customerName: `${booking['First Name'] || ''} ${booking['Last Name'] || ''}`.trim() || booking.customerName,
          customerPhone: booking['Phone Number'] || booking.customerPhone,
          city: booking.City || booking.city,
          streetAddress: booking['Street Address'] || booking.streetAddress,
          buildingName: booking['Building Name'] || booking.buildingName,
          floor: booking['Building Floor'] || booking.floor,
          postalCode: booking['Postal Code'] || booking.postalCode,
          serviceArea: booking.City || booking['City'] || booking.serviceArea
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
        const rawBookings = data?.bookings || data?.data || data || []
        this.activeBookings = rawBookings.map(booking => ({
          id: booking.Booking_ID || booking.id,
          status: booking.Status || booking.status,
          scheduledDate: booking['Scheduled Date'] || booking.scheduledDate,
          scheduledTime: booking['Scheduled Time'] || booking.scheduledTime,
          totalPrice: booking['Total Price'] || booking.totalPrice,
          applianceName: booking["Appliance's Name (EN)"] || booking.applianceName,
          applianceNameAr: booking["Appliance's Name (AR)"] || booking.applianceNameAr,
          issueDescription: booking['Issue Description'] || booking.issueDescription,
          customerFirstName: booking['First Name'] || booking.customerFirstName,
          customerLastName: booking['Last Name'] || booking.customerLastName,
          customerName: `${booking['First Name'] || ''} ${booking['Last Name'] || ''}`.trim() || booking.customerName,
          customerPhone: booking['Phone Number'] || booking.customerPhone,
          city: booking.City || booking.city,
          streetAddress: booking['Street Address'] || booking.streetAddress,
          buildingName: booking['Building Name'] || booking.buildingName,
          floor: booking['Building Floor'] || booking.floor,
          postalCode: booking['Postal Code'] || booking.postalCode,
          paymentStatus: booking['Payment Status'] || booking.paymentStatus
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
        const rawBookings = data?.bookings || data?.data || data || []
        this.completedBookings = rawBookings.map(booking => ({
          id: booking.Booking_ID || booking.id,
          status: booking.Status || booking.status || 'completed',
          scheduledDate: booking['Scheduled Date'] || booking.scheduledDate,
          scheduledTime: booking['Scheduled Time'] || booking.scheduledTime,
          completedAt: booking['Completed At'] || booking.completedAt,
          totalPrice: booking['Total Price'] || booking.totalPrice,
          applianceName: booking["Appliance's Name (EN)"] || booking.applianceName,
          applianceNameAr: booking["Appliance's Name (AR)"] || booking.applianceNameAr,
          issueDescription: booking['Issue Description'] || booking.issueDescription,
          customerFirstName: booking['First Name'] || booking.customerFirstName,
          customerLastName: booking['Last Name'] || booking.customerLastName,
          customerName: `${booking['First Name'] || ''} ${booking['Last Name'] || ''}`.trim() || booking.customerName,
          city: booking.City || booking.city,
          rating: booking.Rating || booking.rating,
          review: booking.Review || booking.review
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
