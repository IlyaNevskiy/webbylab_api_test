import { Op } from "sequelize";
import { MovieModel } from "../database";
import { IMovie } from "../shared/types";

export default class MovieService{
  async getAll({offset, limit, sortBy, order, actors, title}: any){

      return await  MovieModel.findAll({
        offset,
        limit,
        order: [[sortBy, order]],
        where:
         {
           actors: { [Op.like]: `%${actors}%`},
           title: { [Op.like]: `%${title}%` }, 
         }
      });
  }

  async getOne(id: number){
    return await MovieModel.findOne({ where:{ id } })
  }

  async createMovie(movie: IMovie){
    return await MovieModel.create({ ...movie, actors: movie.actors.toLocaleString() })
  }

  async updateMovie(id: number, movie: IMovie){
    return await MovieModel.update({ ...movie, actors: movie.actors.toLocaleString() }, { where:{ id }})
  }

  async importMoviesByFile(array:string[]){
    const arrayOfRows = array.filter((item) => {
     if(!!item.split(`\r`)[0].length) return item
    });
    const clearArray = arrayOfRows.map(item=>item.replace(`\r`,''))
    const movies = [];
    while (clearArray.length) {
      const [title, year, format, actors] = clearArray.splice(0, 4);
      movies.push({
        title: title.split(':')[1].trim(),
        year: year.split(':')[1].trim(),
        format: format.split(':')[1].trim(),
        actors: actors.split(':')[1].split(',').map((el: string) => el.trim()).join(',')
      });
    }
    const data=movies.map((item)=>MovieModel.create(item))
    
    return await Promise.all(data)
  }

  async deleteMovie(id: number){
    return await MovieModel.destroy({ where: { id } });
  }

}
