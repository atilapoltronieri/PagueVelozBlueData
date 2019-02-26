using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PagueVelozBlueData.Models;
using PagueVelozBlueData.DAO;

namespace PagueVelozBlueData.Services
{
    public class EmpresaService
    {
        public EmpresaModel SalvarEmpresa(EmpresaModel pEmpresaModel)
        {
            return new EmpresaDAO().SalvarEmpresa(pEmpresaModel);
        }

        public EmpresaModel DeletarEmpresa(EmpresaModel pEmpresaModel)
        {
            return new EmpresaDAO().DeletarEmpresa(pEmpresaModel);
        }

        public List<EmpresaModel> BuscarEmpresa(EmpresaModel pEmpresaModel)
        {
            return new EmpresaDAO().BuscarEmpresa(pEmpresaModel);
        }


        public List<EmpresaModel> CarregarEmpresa()
        {
            return new EmpresaDAO().CarregarTodosEmpresa();
        }
    }
}