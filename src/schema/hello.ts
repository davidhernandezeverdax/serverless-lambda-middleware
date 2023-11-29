export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        lastName: { type: 'string' },
        age: { type: 'integer' },
      },
      required: ['name', 'lastName', 'age'] 
    }
  }
}