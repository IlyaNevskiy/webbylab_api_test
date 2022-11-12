import { Request, Response } from 'express';
import { MovieService } from '../services';
import { MovieSortedBy, MovieSortedType, ResponseMessage, ResponseStatusCodesEnum } from '../shared/constants';

export class MovieController{
  constructor(private movieService: MovieService) {}

  async getAll(req: Request,res: Response){
    const { limit = 20, offset = 0, sortBy = MovieSortedBy.ID, order = MovieSortedType.DESC, actors = '', title = '' } = req.query;

    const movies = await this.movieService.getAll({
      limit,
      offset,
      order,
      sortBy,
      actors,
      title
    });

    return res
      .status(ResponseStatusCodesEnum.OK)
      .json({ message: ResponseMessage.NO_MESSAGE, movies });
  }

  async getOne(req: Request,res: Response){
    const movie= await this.movieService.getOne(Number(req.params.id));

    return res
      .status(ResponseStatusCodesEnum.OK)
      .json({ message: ResponseMessage.NO_MESSAGE, movie });
  }

  async createMovie(req: Request,res: Response){
    const movie= await this.movieService.createMovie(req.body);

    return res
      .status(ResponseStatusCodesEnum.CREATED)
      .json({ message: ResponseMessage.MOVIE_CREATED, movie });
  }

  async updateMovie(req: Request,res: Response){
    const movie = await this.movieService.updateMovie(Number(req.params.id), req.body);

    return res
      .status(ResponseStatusCodesEnum.CREATED)
      .json({ message: ResponseMessage.MOVIE_UPDATED, movie });
  }

  async deleteMovie(req: Request,res: Response){
    const movie= await this.movieService.deleteMovie(Number(req.params.id));

    return res
      .status(ResponseStatusCodesEnum.OK)
      .json({ message: ResponseMessage.MOVIE_DELETED, movie });
  }

  async importByFile(req: Request,res: Response){
    // @ts-ignore
    const data = req.files.undefined.data;
    const dataArray = data.toString('utf8').split('\n');

    const movie= await this.movieService.importMoviesByFile(dataArray);

    return res
      .status(ResponseStatusCodesEnum.OK)
      .json({ message: ResponseMessage.MOVIE_CREATED, movie });
  }
}

const movieController = new MovieController(new MovieService());
export default movieController;
