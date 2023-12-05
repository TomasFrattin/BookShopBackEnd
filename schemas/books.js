import z from 'zod'

const bookSchema = z.object({
  title: z.string({
    invalid_type_error: 'El título ingresado no está permitido.',
    required_error: 'Se necesita el ingreso del título.'
  }),
  year: z.number().int().min(1800).max(2024),
  author: z.string(),
  price: z.number().positive(),
  rate: z.number().min(0).max(5).default(3),
  image: z.string().url({
    message: 'La imagen debe tener un URL válido.'
  }),
  genre: z.array(
    z.enum(['History', 'Horror', 'Mystery', 'Psychology', 'Religion', 'Romance', 'Sci-Fi', 'Self Help']),
  )
})

export function validateBook (input) {
  return bookSchema.safeParse(input)
}

export function validatePartialBook (input) {
  return bookSchema.partial().safeParse(input)
}