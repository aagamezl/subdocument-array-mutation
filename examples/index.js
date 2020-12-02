const { generateUpdateStatement } = require('./../')

const INPUT_DATA = {
  _id: 1,
  name: 'Johnny Content Creator',
  posts: [
    {
      _id: 2,
      value: 'one',
      mentions: []
    },
    {
      _id: 3,
      value: 'two',
      mentions: [
        {
          _id: 5,
          text: 'apple'
        },
        {
          _id: 6,
          text: 'orange'
        }
      ]
    },
    {
      _id: 4,
      value: 'three',
      mentions: []
    }
  ]
}

// const mutation = { posts: [{ _id: 2, value: 'too' }] }
// const output = generateUpdateStatement(INPUT_DATA, mutation)
// // { $update: { 'posts.0.value': 'too' } }
// console.log('output: %o', JSON.stringify(output))

// const mutation = { posts: [{ value: 'four' }] }
// const output = generateUpdateStatement(INPUT_DATA, mutation)
// // { $add: { posts: [{ value: 'four' }] }}
// console.log('output: %o', JSON.stringify(output))

// const mutation = { posts: [{ _id: 3, mentions: [{ text: 'banana' }] }] }
// const output = generateUpdateStatement(INPUT_DATA, mutation)
// // { $add: { 'posts.1.mentions': [{ text: 'banana' }] } }
// console.log('output: %o', JSON.stringify(output))

// const mutation = { posts: [{ _id: 3, mentions: [{ _id: 5, text: 'banana' }] }] }
// const output = generateUpdateStatement(INPUT_DATA, mutation)
// // { $update: { 'posts.1.mentions.0.text': 'banana' } }
// console.log('output: %o', JSON.stringify(output))

// const mutation = { posts: [{ _id: 2, _delete: true }] }
// const output = generateUpdateStatement(INPUT_DATA, mutation)
// // { $remove : { 'posts.0' : true } }
// console.log('output: %o', JSON.stringify(output))

// const mutation = { posts: [{ _id: 3, mentions: [{ _id: 6, _delete: true }] }] }
// const output = generateUpdateStatement(INPUT_DATA, mutation)
// // { $remove : { 'posts.0' : true } }
// console.log('output: %o', JSON.stringify(output))

const mutation = { posts: [{ _id: 2, value: 'too' }, { value: 'four' }, { _id: 4, _delete: true }] }
const output = generateUpdateStatement(INPUT_DATA, mutation)
// { $update: { 'posts.0.value': 'too' }, $add: { posts: [{ value: four }] }, $remove : { 'posts.2' : true } }
console.log('output: %o', JSON.stringify(output))
