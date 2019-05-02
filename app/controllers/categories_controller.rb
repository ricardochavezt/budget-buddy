class CategoriesController < ApiController

  # GET /categories
  def index
    @categories = Category.select("id, name").all

    render json: @categories
  end

end
