import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Category from 'App/Models/Category'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class Password extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public password: string

  @belongsTo(() => Category, {
    serializeAs: null
  })
  public category: BelongsTo<typeof Category>

  @column()
  public categoryId?: number

  @belongsTo(() => User, {
    serializeAs: null
  })
  public user: BelongsTo<typeof User>

  @column()
  public userId?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
