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
    type: ["admin", "desktop_user"],
    items: [
      // { title: "app", path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      {
        title: "dashboard",
        path: PATH_DASHBOARD.general.app,
        type: ["admin", "desktop_user"],
      },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },
  // ----------------------------------------------------------------------
  {
    subheader: "Master",
    type: ["admin"],
    items: [
      {
        title: "Location",
        path: PATH_DASHBOARD.master.location,
        type: ["admin"],
      },
      {
        title: "Row",
        path: PATH_DASHBOARD.master.row,
        type: ["admin"],
      },
      {
        title: "Rack/Cupboard",
        path: PATH_DASHBOARD.master.rackCupboard,
        type: ["admin"],
      },
      {
        title: "Assets",
        path: PATH_DASHBOARD.master.assets,
        type: ["admin"],
      },
    ],
  },
  {
    subheader: "Action",
    type: ["admin"],
    items: [
      {
        title: "Assets Request",
        path: PATH_DASHBOARD.action.assetsRequest,
        type: ["admin"],
      },
      {
        title: "Activity",
        path: PATH_DASHBOARD.action.activity,
        type: ["admin"],
      },
    ],
  },
  {
    subheader: "Request",
    type: ["desktop_user"],
    items: [
      {
        title: "My Request",
        path: PATH_DASHBOARD.user_desktop.allReq,
        type: ["desktop_user"],
      },
    ],
  },
];

export default navConfig;
