module.exports = [
  {
    id: 'country',
    sourceIndex: 0,
    label: 'Country',
  },
  {
    id: 'forest-loss',
    sourceIndex: 2,
    type: 'forest',
    label: 'Tree Cover Loss',
    units: 'M ha',
    isNumber: true,
    format: '.2f',
    display: 'choropleth',
    binPartitions: [
      { value: 0.03, label: '< 30,000 ha' },
      { value: 0.1, label: '30,000 - 100,000 ha' },
      { value: 1, label: '100,000 - 1 M ha' },
      { value: Number.POSITIVE_INFINITY, label: '> 1 M ha' },
      { value: null, label: 'No data available, no forest loss reported, and Annex 1 countries' },
    ],
  },
  {
    id: 'forest-loss_percent',
    sourceIndex: 3,
    multiplier: 100, /* transform raw value */
    type: 'forest',
    label: 'Rate of Loss',
    units: 'percent/year',
    isNumber: true,
    format: '.2f',
    display: 'choropleth',
    binPartitions: [
      { value: 0.005, label: '< 0.005 %' },
      { value: 0.1, label: '0.005 - 0.1 %' },
      { value: 1, label: '0.1 - 1 %' },
      { value: Number.POSITIVE_INFINITY, label: '> 1 %' },
      { value: null, label: 'No data available, no forest loss reported, and Annex 1 countries' },
    ],
  },
  {
    id: 'finance-results_based',
    sourceIndex: 6,
    type: 'finance',
    label: 'Results-Based REDD+ Commitments',
    units: 'M USD',
    isNumber: true,
    format: ',.0f',
    display: 'icon',
    binPartitions: [
      { value: 10, label: '< 10 M USD' },
      { value: 50, label: '10 M - 50 M USD' },
      { value: 200, label: '50 M - 200 M USD' },
      { value: Number.POSITIVE_INFINITY, label: '> 200 M USD' },
    ],
  },
  {
    id: 'finance-redd',
    sourceIndex: 4,
    type: 'finance',
    label: 'REDD+ Phase 1 and 2 Finance',
    units: 'M USD',
    isNumber: true,
    format: ',.0f',
    display: 'icon',
    binPartitions: [
      { value: 10, label: '< 10 M USD' },
      { value: 50, label: '10 M - 50 M USD' },
      { value: 200, label: '50 M - 200 M USD' },
      { value: Number.POSITIVE_INFINITY, label: '> 200 M USD' },
    ],
  },
  {
    id: 'finance-development',
    sourceIndex: 5,
    type: 'finance',
    label: 'Development Finance',
    units: 'M USD',
    isNumber: true,
    format: ',.0f',
    display: 'icon',
    binPartitions: [
      { value: 10, label: '< 10 M USD' },
      { value: 50, label: '10 M - 50 M USD' },
      { value: 200, label: '50 M - 200 M USD' },
      { value: Number.POSITIVE_INFINITY, label: '> 200 M USD' },
    ],
  },
};
