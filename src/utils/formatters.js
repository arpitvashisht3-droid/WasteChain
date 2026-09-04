export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatWeight = (kg) => {
  if (kg < 1) {
    return `${Math.round(kg * 1000)} g`;
  }
  return `${kg.toFixed(1)} kg`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getStatusBadgeVariant = (status) => {
  switch (status?.toLowerCase()) {
    case 'recycled':
    case 'completed':
    case 'verified':
      return 'emerald';
    case 'collected':
    case 'sorted':
      return 'sky';
    case 'collection requested':
    case 'pending':
      return 'amber';
    case 'ai identified':
    case 'generated':
      return 'indigo';
    default:
      return 'slate';
  }
};
