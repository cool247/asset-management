// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },
  // ----------------------------------------------------------------------
  {
    subheader: 'Reports',
    items: [
      {
        title: 'Communication Status',
        icon: ICONS.dashboard,
        path:PATH_DASHBOARD.report.root,
        children: [
          {
            title: 'Meter Wise Coverage',
            path: PATH_DASHBOARD.report.meterWiseCoverage,
          },
          {
            title: 'DCU Wise coverage',
            path: '/app/mdm/MASTER/DCUWiseCoverage.aspx',
          },
          {
            title: 'Inverter Communication',
            path: '/app/MDM/REPORT/GridTieAndHybridDetails.aspx',
          },
        ],
      },
      {
        title: 'Meter Data',
        icon: ICONS.dashboard,
        children: [
          {
            title: 'IP Data',
            path: '/app/mdm/DATA/IPDataReport.aspx',
          },
          {
            title: 'LS Data',
            path: '/app/mdm/DATA/LoadSurveyReport.aspx',
          },
          {
            title: 'Billing Data',
            path: '/app/mdm/DATA/BillingDataReport.aspx',
          },
        ],
      },
      {
        title: 'Consumption Analysis',
        icon: ICONS.dashboard,
        children: [
          {
            title: 'Consumer',
            path: '/app/MDM/REPORT/ConsumerConsumptionView.aspx',
          },
        ],
      },
      {
        title: 'Pattern Comparison',
        icon: ICONS.dashboard,
        children: [
          {
            title: 'Consumer',
            path: '/app/MDM/REPORT/ConsumerPatternComparison.aspx',
          },
        ],
      },
      {
        title: 'Alarm',
        icon: ICONS.dashboard,
        children: [
          {
            title: 'Generated Alarm Analysis',
            path: '/app/mdm/Report/AlarmReport.aspx',
          },
          {
            title: 'Validation Rule Failure Report',
            path: '/app/mdm/Report/ValidationEventDataReport.aspx',
          },
          {
            title: 'Derived Data Report',
            path: '/app/mdm/Report/DerviedDataReport.aspx',
          },
        ],
      },
      {
        title: 'Consumer Information',
        path: '/app/MDM/REPORT/ConsumerInformationReport.aspx',
      },
      {
        title: 'Solar Inverter Data',
        icon: ICONS.dashboard,
        children: [
          {
            title: 'Grid Tie Inverter Data',
            path: '/app/MDM/REPORT/GridTieData.aspx',
          },
          {
            title: 'Hybrid Inverter Data',
            path: '/app/MDM/REPORT/HybridInverter.aspx',
          },
        ],
      },
    ],
  },
  {
    subheader: 'Configuration',
    items: [
      {
        title: 'Organization',
        path: '/app/mdm/MASTER/OrganisationOfficeConfiguration.aspx',
      },
      {
        title: 'Network',
        children: [
          {
            title: 'Configuration',
            path: '/app/mdm/MASTER/NetworkOfficeConfiguration.aspx',
          },
          {
            title: 'DTR Detail Config',
            path: '/app/mdm/MASTER/DTRDetail.aspx',
          },
        ],
      },
      {
        title: 'DCU Configuration',
        path: '/app/mdm/MASTER/DCUConfiguration.aspx',
      },
      {
        title: 'Meter',
        children: [
          {
            title: 'Meter Information',
            path: '/app/mdm/MASTER/MeterInformation.aspx',
          },
          {
            title: 'Meter Command Request Configuration',
            path: '/app/mdm/MASTER/MeterCommandRequestConfiguration.aspx',
          },
        ],
      },
      {
        title: 'Consumer',
        children: [
          {
            title: 'Connection',
            path: '/app/mdm/MASTER/ConsumerConnConfig.aspx',
          },
          {
            title: 'Meter Replacement',
            path: '/app/mdm/MASTER/ConsumerMeterReplacement.aspx',
          },
          {
            title: 'IP Config',
            path: '/app/mdm/REPORT/IPConfig.aspx',
          },
        ],
      },
      {
        title: 'Appliance',
        children: [
          {
            title: 'Appliance Entry',
            path: '/app/mdm/MASTER/ConsumerApplianceEntry.aspx',
          },
        ],
      },
      {
        title: 'Formula',
        children: [
          {
            title: 'Validation Rule',
            path: '/app/mdm/FORMULA/ValidationRules.aspx',
          },
          {
            title: 'Derived Data',
            path: '/app/mdm/FORMULA/FormulaEditor.aspx',
          },
          // You can add more sub-menu items here if needed
        ],
      },
      {
        title: 'Grouping',
        children: [
          {
            title: 'Group Configuration',
            path: '/app/mdm/MASTER/GroupConfiguration.aspx',
          },
          {
            title: 'Group & Rule Mapping',
            path: '/app/mdm/MASTER/GroupRuleMapping.aspx',
          },
        ],
      },
      {
        title: 'Holiday',
        children: [
          {
            title: 'Holiday Master',
            path: '/app/mdm/MASTER/HolidayMaster.aspx',
          },
          {
            title: 'Holiday Details',
            path: '/app/mdm/MASTER/HolidayDetails.aspx',
          },
        ],
      },
      {
        title: 'Settings',
        path: '/app/MDM/MASTER/ConfigurationSetting.aspx',
      },
    ],
  },
  {
    subheader: 'Home Automation',
    items: [
      {
        title: 'Appliance Action',
        path: '/app/mdm/MASTER/ConsumerApplianceAction.aspx',
      },
      {
        title: 'Appliance Control',
        path: '/app/MDM/MASTER/DBBoxControl.aspx',
      },
    ],
  },
  {
    subheader: 'Notifications',
    items: [
      {
        title: 'Alarms',
        path: '/app/mdm/Alarm/AlarmNotification.aspx',
      },
      {
        title: 'User Notification',
        path: '/app/MDM/ServiceRequest/SendNotification.aspx',
      },
      {
        title: 'Consumer Load Violation',
        path: '/app/MDM/ServiceRequest/ConsumerLoadViolation.aspx',
      },
      {
        title: 'Consumer Complaint',
        path: '/app/mdm/Alarm/ConsumerComplaint.aspx',
      },
    ],
  },
  {
    subheader: 'Import',
    items: [
      {
        title: 'Excel Format Download',
        path: '/app/MDM/IMPORT/MeterDataExcelDwld.aspx',
      },
      {
        title: 'Meter Information',
        path: '/app/MDM/IMPORT/MeterInfoImport.aspx',
      },
      {
        title: 'Meter Data',
        path: '/app/MDM/IMPORT/MeterDataEntry.aspx',
      },
    ],
  },
  {
    subheader: 'Export',
    items: [
      {
        title: 'Consumer Data Download',
        path: '/app/MDM/DATA/ConsumerDataDownload.aspx',
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
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
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
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

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },
];

export default navConfig;
