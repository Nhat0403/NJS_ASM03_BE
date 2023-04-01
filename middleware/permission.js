exports.permission = {
  customer: [
    { 
      route: 'chatrooms',
      can: ['addMessage', 'createNewRoom']
    },
    {
      route: 'email',
      can: ['postEmail']
    },
    {
      route: 'histories',
      can: ['getHistoryAPI', 'getDetail']
    },
    {
      route: 'order',
      can: ['postOrder']
    }
  ],
  counselor: [
    { 
      route: 'chatrooms',
      can: ['addMessage', 'createNewRoom', 'searchMessage', 'getAllRoom']
    },
    {
      route: 'email',
      can: ['postEmail']
    },
    {
      route: 'histories',
      can: ['getHistoryAPI', 'getDetail']
    },
    {
      route: 'order',
      can: ['postOrder']
    }
  ],
  admin: [
    {
      route: 'admin',
      can: ['getAllProducts', 'searchProductByQuery', 'getAllOrders', 'getOrderById', 'getAllClients']
    },
    { 
      route: 'chatrooms',
      can: ['addMessage', 'createNewRoom', 'searchMessage', 'getAllRoom']
    },
    {
      route: 'email',
      can: ['postEmail']
    },
    {
      route: 'histories',
      can: ['getHistoryAPI', 'getDetail']
    },
    {
      route: 'order',
      can: ['postOrder']
    }
  ],

}