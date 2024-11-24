// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = name => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  mail: getIcon("ic_mail"),
  user: getIcon("ic_user"),
  kanban: getIcon("ic_kanban"),
  banking: getIcon("ic_banking"),
  booking: getIcon("ic_booking"),
  invoice: getIcon("ic_invoice"),
  calendar: getIcon("ic_calendar"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
};

const navConfig = [
  // GENERAL
  {
    subheader: "general",
    items: [
      // { title: "app", path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      {
        title: "dashboard",
        path: PATH_DASHBOARD.general.analytics,
      },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },
  // ----------------------------------------------------------------------
  {
    subheader: "Master",

    items: [
      {
        title: "Location",
        path: PATH_DASHBOARD.master.location,
      },
      {
        title: "Row",
        path: PATH_DASHBOARD.master.row,
      },
      {
        title: "Rack/Cupboard",
        path: PATH_DASHBOARD.master.rackCupboard,
      },
      {
        title: "Assets",
        path: PATH_DASHBOARD.master.assets,
      },
    ],
  },


  {
    subheader: "Action",
    items: [
      {
        title: "Assets Request",
        path: PATH_DASHBOARD.action.assetsRequest,
      },
      {
        title: "Activity",
        path: PATH_DASHBOARD.action.activity,
      },
      
     
    ],
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      // USER
      {
        title: "user",
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: "profile", path: PATH_DASHBOARD.user.profile },
          { title: "cards", path: PATH_DASHBOARD.user.cards },
          { title: "list", path: PATH_DASHBOARD.user.list },
          { title: "create", path: PATH_DASHBOARD.user.new },
          { title: "edit", path: PATH_DASHBOARD.user.demoEdit },
          { title: "account", path: PATH_DASHBOARD.user.account },
        ],
      },

      // E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      // INVOICE
      {
        title: "invoice",
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: "list", path: PATH_DASHBOARD.invoice.list },
          { title: "details", path: PATH_DASHBOARD.invoice.demoView },
          { title: "create", path: PATH_DASHBOARD.invoice.new },
          { title: "edit", path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
    ],
  },

 
];

export default navConfig;
