export default {
  items: [
    {
      title: true,
      name: 'Welcome to Admin Tell',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Manage Course',
      url: '/course',
      icon: 'icon-layers',
      children: [
        {
          name: 'View all course',
          url: '/course',
          icon: ''
        },
        {
          name: 'Add course',
          url: '/course/add',
          icon: ''
        }
      ],
    }
  ],
};
