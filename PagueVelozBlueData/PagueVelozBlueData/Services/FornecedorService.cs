using PagueVelozBlueData.DAO;
using PagueVelozBlueData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PagueVelozBlueData.Services
{
    public class FornecedorService
    {
        public FornecedorModel SalvarFornecedor(FornecedorModel pFornecedorModel)
        {
            return new FornecedorDAO().SalvarFornecedor(pFornecedorModel);
        }

        public FornecedorModel DeletarFornecedor(FornecedorModel pFornecedorModel)
        {
            return new FornecedorDAO().DeletarFornecedor(pFornecedorModel);
        }

        public List<FornecedorModel> CarregarFornecedor()
        {
            return new FornecedorDAO().CarregarTodosFornecedor();
        }

        public List<FornecedorModel> BuscarFornecedor(FornecedorModel pFornecedorModel)
        {
            return new FornecedorDAO().BuscarFornecedor(pFornecedorModel);
        }

    }
}