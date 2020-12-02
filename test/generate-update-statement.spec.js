const test = require('ava')

const { generateUpdateStatement } = require('./../src')

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

test('should return the correct single update statement', t => {
  const mutation = { posts: [{ _id: 2, value: 'too' }] }
  const expected = { $update: { 'posts.0.value': 'too' } }

  const output = generateUpdateStatement(INPUT_DATA, mutation)

  t.deepEqual(output, expected)
})

test('should return the correct complex update statement', t => {
  const mutation = { posts: [{ _id: 3, mentions: [{ _id: 5, text: 'banana' }] }] }
  const expected = { $update: { 'posts.1.mentions.0.text': 'banana' } }

  const output = generateUpdateStatement(INPUT_DATA, mutation)

  t.deepEqual(output, expected)
})

test('should return the correct single add statement', t => {
  const mutation = { posts: [{ value: 'four' }] }
  const expected = { $add: { posts: [{ value: 'four' }] } }

  const output = generateUpdateStatement(INPUT_DATA, mutation)

  t.deepEqual(output, expected)
})

test('should return the correct complex add statement', t => {
  const mutation = { posts: [{ _id: 3, mentions: [{ text: 'banana' }] }] }
  const expected = { $add: { 'posts.1.mentions': [{ text: 'banana' }] } }

  const output = generateUpdateStatement(INPUT_DATA, mutation)

  t.deepEqual(output, expected)
})

test('should return the correct single remove statement', t => {
  const mutation = { posts: [{ _id: 2, _delete: true }] }
  const expected = { $remove: { 'posts.0': true } }

  const output = generateUpdateStatement(INPUT_DATA, mutation)

  t.deepEqual(output, expected)
})

test('should return the correct complex remove statement', t => {
  const mutation = { posts: [{ _id: 3, mentions: [{ _id: 6, _delete: true }] }] }
  const expected = { $remove: { 'posts.1.mentions.1': true } }

  const output = generateUpdateStatement(INPUT_DATA, mutation)

  t.deepEqual(output, expected)
})

test('should return the correct multiple statement', t => {
  const mutation = { posts: [{ _id: 2, value: 'too' }, { value: 'four' }, { _id: 4, _delete: true }] }
  const expected = { $update: { 'posts.0.value': 'too' }, $add: { posts: [{ value: 'four' }] }, $remove: { 'posts.2': true } }

  const output = generateUpdateStatement(INPUT_DATA, mutation)

  t.deepEqual(output, expected)
})
