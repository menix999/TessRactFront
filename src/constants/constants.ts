export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1280,
};

export const routes = {
  main: '/',
  login: '/login',
  register: '/register',
  recoverPassword: '/recover-password',
  regulations: '/regulations',
  aboutUs: '/about-us',
  accountSettings: '/account-settings',
  product: '/product',
  productList: '/product-list',
  addProduct: '/add-product',
  cart: '/cart',
  buyWithoutRegister: '/buy-without-register',
  deliverySummary: '/delivery-summary',
  manageOrders: '/manage-orders',
  orderSummary: '/order-summary',
  myOrders: '/my-orders',
  myAccount: '/my-account',
};

export const categories = {
  headphones: 'Headphones',
  smartwatch: 'Smartwatch',
  watch: 'Watch',
};

// create routesPermission variable and give themm

export const routesPermissionConfig = [
  { path: '/login', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/register', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/recover-password', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/regulations', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/about-us', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/account-settings', roles: ['Administrator', 'User'] },
  { path: '/product', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/product-list', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/add-product', roles: ['Administrator'] },
  { path: '/cart', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/buy-without-register', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/delivery-summary', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/manage-orders', roles: ['Administrator'] },
  { path: '/order-summary', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
  { path: '/my-orders', roles: ['Administrator', 'User'] },
  { path: '/my-account', roles: ['Administrator', 'User'] },
  { path: '/', roles: ['Administrator', 'User', 'UnverifiedUser', 'Guest'] },
];

export const avatarColors = [
  '#ff7f0e',
  '#1f77b4',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
];

export const ConstantProduct = () => {
  const categoryOptions = [
    {
      name: 'Headphones',
      id: 1,
      nameValue: 'Headphones',
    },
    {
      name: 'Smartwatch',
      id: 2,
      nameValue: 'Smartwatch',
    },
    {
      name: 'Watch',
      id: 3,
      nameValue: 'Watch',
    },
  ];

  return {
    categoryOptions,
  };
};
