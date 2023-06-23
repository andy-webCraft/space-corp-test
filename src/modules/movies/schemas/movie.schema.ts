import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getImageURL } from '@utils/getImageURL.util';
import mongoose, { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @ApiProperty({ type: String })
  _id: string | mongoose.Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ type: [String], default: [] })
  images: string[];

  @ApiProperty({ minimum: 1, maximum: 10 })
  @Prop({
    default: 1,
    validate: {
      validator: (value: number) => value >= 1 && value <= 10,
      message: 'value must be in the range from 1 to 10',
    },
  })
  rating: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

MovieSchema.post('init', function (doc) {
  doc.images = doc.images.map((item) => getImageURL(item));
});
