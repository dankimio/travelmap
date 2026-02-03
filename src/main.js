import './index.css'
import Alpine from 'alpinejs'
import world from '@svg-maps/world'
import { countries as countriesData, getEmojiFlag } from 'countries-list'

const buildCountryData = () =>
  Object.entries(countriesData).map(([code, data]) => ({
    code: code.toLowerCase(),
    ...data,
    emoji: data.emoji || getEmojiFlag?.(code) || ''
  }))

const normalizeCode = code => code.toLowerCase()

document.addEventListener('alpine:init', () => {
  const allCountries = buildCountryData()
  const countriesByCode = new Map(allCountries.map(country => [country.code, country]))
  const suggestions = allCountries
    .map(country => ({
      code: country.code,
      name: country.name,
      emoji: country.emoji
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  Alpine.store('travel', {
    allCountries,
    suggestions,
    selectedCountries: [],
    totalCount: 0,
    shareUrl: '',
    mapPaths: new Map(),
    searchElements: null,
    mapContainer: null,
    init() {
      this.searchElements = {
        input: document.querySelector('#autosuggest__input'),
        results: document.querySelector('#autosuggest-results'),
        resultsList: document.querySelector('#autosuggest-list'),
        searchContainer: document.querySelector('#search-input')
      }
      this.mapContainer = document.querySelector('#map-container')
      this.bindSearchEvents()
      this.buildMap()
      this.initFromURL()
      this.syncUI({ push: false })
    },
    bindSearchEvents() {
      const { input, searchContainer } = this.searchElements
      input.addEventListener('input', () => this.renderSuggestions())
      input.addEventListener('focus', () => this.renderSuggestions())

      document.addEventListener('click', event => {
        if (!searchContainer.contains(event.target)) {
          this.hideSuggestions()
        }
      })
    },
    renderSuggestions() {
      const { input, results, resultsList } = this.searchElements
      const query = input.value.trim().toLowerCase()
      resultsList.innerHTML = ''

      if (!query) {
        this.hideSuggestions()
        return
      }

      const filtered = this.suggestions.filter(country =>
        country.name.toLowerCase().includes(query)
      )

      if (filtered.length === 0) {
        this.hideSuggestions()
        return
      }

      filtered.slice(0, 50).forEach(country => {
        const item = document.createElement('li')
        item.className = 'px-4 py-3 hover:bg-gray-100 cursor-pointer'
        item.innerHTML = `
          <div class="flex justify-between">
            <span class="my-suggestion-item">${country.name}</span>
            <span>${country.emoji}</span>
          </div>
        `
        item.addEventListener('click', () => {
          this.addCountry(country.code)
          input.value = ''
          this.hideSuggestions()
          input.focus()
        })
        resultsList.appendChild(item)
      })

      results.classList.remove('hidden')
    },
    hideSuggestions() {
      this.searchElements.results.classList.add('hidden')
    },
    addCountry(code) {
      const countryCode = normalizeCode(code)
      if (!this.selectedCountries.some(country => country.code === countryCode)) {
        const country = countriesByCode.get(countryCode)
        if (country) {
          this.selectedCountries.push({
            code: country.code,
            name: country.name,
            emoji: country.emoji
          })
          this.syncUI()
        }
      }
    },
    removeCountry(code) {
      const countryCode = normalizeCode(code)
      this.selectedCountries = this.selectedCountries.filter(
        country => country.code !== countryCode
      )
      this.syncUI()
    },
    toggleCountry(code) {
      if (this.selectedCountries.some(country => country.code === normalizeCode(code))) {
        this.removeCountry(code)
      } else {
        this.addCountry(code)
      }
    },
    updateMapSelection() {
      this.mapPaths.forEach((path, code) => {
        const isSelected = this.selectedCountries.some(country => country.code === code)
        path.setAttribute('aria-checked', isSelected ? 'true' : 'false')
      })
    },
    updateCount() {
      this.totalCount = this.selectedCountries.length
    },
    updateURL({ push = true } = {}) {
      const newURL = new URL(window.location.href)
      const params = new URLSearchParams(newURL.search)
      const selectedCodes = this.selectedCountries.map(country => country.code)

      if (selectedCodes.length > 0) {
        params.set('countries', selectedCodes.join(','))
      } else {
        params.delete('countries')
      }

      newURL.search = params
      const formattedURL = newURL.toString().replaceAll('%2C', ',')

      if (push) {
        history.pushState({}, '', formattedURL)
      } else {
        history.replaceState({}, '', formattedURL)
      }

      this.shareUrl = selectedCodes.length > 0 ? formattedURL : ''
    },
    copyShareUrl() {
      if (!this.shareUrl) {
        return
      }

      navigator.clipboard.writeText(this.shareUrl)
      alert('Link copied!')
    },
    syncUI(options = {}) {
      this.updateMapSelection()
      this.updateCount()
      this.updateURL(options)
    },
    initFromURL() {
      const urlParams = new URLSearchParams(window.location.search)
      if (this.selectedCountries.length === 0 && urlParams.has('countries')) {
        const parsedCountries = urlParams
          .get('countries')
          .split(',')
          .map(code => code.trim().toLowerCase())
          .filter(code => code.length > 0)

        parsedCountries.forEach(code => this.addCountry(code))
      }
    },
    buildMap() {
      if (this.mapContainer.children.length > 0) {
        return
      }

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('class', 'svg-map')
      svg.setAttribute('viewBox', world.viewBox)
      svg.setAttribute('role', 'group')

      world.locations.forEach(location => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', location.path)
        path.setAttribute('id', location.id)
        path.setAttribute('role', 'checkbox')
        path.setAttribute('aria-checked', 'false')
        path.setAttribute('tabindex', '0')
        path.classList.add('svg-map__location')
        path.addEventListener('click', () => this.toggleCountry(location.id))
        path.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            this.toggleCountry(location.id)
          }
        })

        this.mapPaths.set(location.id, path)
        svg.appendChild(path)
      })

      this.mapContainer.appendChild(svg)
    }
  })
})

Alpine.start()
