class ExpensesController < ApiController
  before_action :set_expense, only: [:show, :update, :destroy]

  # GET /expenses
  def index
    if params[:all]
      @expenses = Expense.all.order(made_at: :desc, created_at: :desc)
    else
      @expenses = Expense.where(made_at: (Date.today - 1.month)..Date.today)
        .order(made_at: :desc, created_at: :desc)
    end

    render json: @expenses
  end

  # GET /expenses/1
  def show
    render json: @expense
  end

  # POST /expenses
  def create
    @expense = Expense.new(expense_params)

    if @expense.save
      render json: @expense, status: :created, location: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /expenses/1
  def update
    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /expenses/1
  def destroy
    @expense.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_expense
      @expense = Expense.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def expense_params
      params.require(:expense).permit(:amount, :category_id, :made_at, :comment)
    end
end
