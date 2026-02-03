import './index.css'
import Alpine from 'alpinejs'
import world from '@svg-maps/world'
import { countries as countriesData } from 'countries-list'

window.Alpine = Alpine

const allCountries = Object.entries(countriesData).map(([code, data]) => ({
  code: code.toLowerCase(),
  ...data
}))

const countriesByCode = new Map(allCountries.map(country => [country.code, country]))

const suggestions = allCountries
  .map(country => ({
    code: country.code,
    name: country.name,
    emoji: country.emoji
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const state = {
  selectedCountries: [],
  shareUrl: ''
}

const mapPaths = new Map()

const normalizeCode = code => code.toLowerCase()

const addCountry = code => {
  const countryCode = normalizeCode(code)

  if (!state.selectedCountries.includes(countryCode)) {
    state.selectedCountries.push(countryCode)
    syncUI()
  }
}

const removeCountry = code => {
  const countryCode = normalizeCode(code)
  state.selectedCountries = state.selectedCountries.filter(value => value !== countryCode)
  syncUI()
}

const toggleCountry = code => {
  const countryCode = normalizeCode(code)

  if (state.selectedCountries.includes(countryCode)) {
    removeCountry(countryCode)
  } else {
    addCountry(countryCode)
  }
}

const updateMapSelection = () => {
  mapPaths.forEach((path, code) => {
    const isSelected = state.selectedCountries.includes(code)
    path.setAttribute('aria-checked', isSelected ? 'true' : 'false')
  })
}

const updateLabels = () => {
  const selected = state.selectedCountries
    .map(code => countriesByCode.get(code))
    .filter(Boolean)
    .map(country => ({
      code: country.code,
      name: country.name,
      emoji: country.emoji
    }))

  Alpine.store('travel').selectedCountries = selected
}

const updateCount = () => {
  Alpine.store('travel').totalCount = state.selectedCountries.length
}

const updateURL = ({ push = true } = {}) => {
  const newURL = new URL(window.location.href)
  const params = new URLSearchParams(newURL.search)

  if (state.selectedCountries.length > 0) {
    params.set('countries', state.selectedCountries.join(','))
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

  state.shareUrl = state.selectedCountries.length > 0 ? formattedURL : ''
  Alpine.store('travel').shareUrl = state.shareUrl
}

const syncUI = (options = {}) => {
  updateMapSelection()
  updateCount()
  updateLabels()
  updateURL(options)
}

const initFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search)

  if (state.selectedCountries.length === 0 && urlParams.has('countries')) {
    const parsedCountries = urlParams
      .get('countries')
      .split(',')
      .map(code => code.trim().toLowerCase())
      .filter(code => code.length > 0)

    state.selectedCountries = parsedCountries
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#autosuggest__input')
  const results = document.querySelector('#autosuggest-results')
  const resultsList = document.querySelector('#autosuggest-list')
  const mapContainer = document.querySelector('#map-container')
  const searchContainer = document.querySelector('#search-input')

  Alpine.store('travel', {
    selectedCountries: [],
    totalCount: 0,
    shareUrl: ''
  })

  window.travelMap = {
    removeCountry
  }

  const renderSuggestions = () => {
    const query = input.value.trim().toLowerCase()
    resultsList.innerHTML = ''

    if (!query) {
      results.classList.add('hidden')
      return
    }

    const filtered = suggestions.filter(country =>
      country.name.toLowerCase().includes(query)
    )

    if (filtered.length === 0) {
      results.classList.add('hidden')
      return
    }

    filtered.slice(0, 50).forEach(country => {
      const item = document.createElement('li')
      item.className = 'autosuggest__results-item'
      item.innerHTML = `
        <div class="flex justify-between">
          <span class="my-suggestion-item">${country.name}</span>
          <span>${country.emoji}</span>
        </div>
      `
      item.addEventListener('click', () => {
        addCountry(country.code)
        input.value = ''
        results.classList.add('hidden')
        input.focus()
      })
      resultsList.appendChild(item)
    })

    results.classList.remove('hidden')
  }

  input.addEventListener('input', renderSuggestions)
  input.addEventListener('focus', renderSuggestions)

  document.addEventListener('click', event => {
    if (!searchContainer.contains(event.target)) {
      results.classList.add('hidden')
    }
  })

  const buildMap = () => {
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
      path.addEventListener('click', () => toggleCountry(location.id))
      path.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          toggleCountry(location.id)
        }
      })

      mapPaths.set(location.id, path)
      svg.appendChild(path)
    })

    mapContainer.appendChild(svg)
  }

  buildMap()
  initFromURL()
  syncUI({ push: false })
  Alpine.start()
})
