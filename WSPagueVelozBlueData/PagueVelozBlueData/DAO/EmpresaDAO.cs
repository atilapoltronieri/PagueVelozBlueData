using PagueVelozBlueData.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace PagueVelozBlueData.DAO
{
    public class EmpresaDAO : DbContext
    {
        public EmpresaDAO() : base("ApplicationServices")
        {

        }

        public DbSet<EmpresaModel> Empresa { get; set; }

        public EmpresaModel SalvarEmpresa(EmpresaModel pEmpresa)
        {
            var erroValidacao = pEmpresa.ValidaEmpresaModel();

            if (!string.IsNullOrEmpty(erroValidacao))
                throw new Exception(erroValidacao);

            using (var dto = new EmpresaDAO())
            {
                dto.Empresa.AddOrUpdate(pEmpresa);
                dto.SaveChanges();
            }

            return pEmpresa;
        }

        public EmpresaModel DeletarEmpresa(EmpresaModel pEmpresa)
        {
            using (var dto = new EmpresaDAO())
            {
                dto.Empresa.Attach(pEmpresa);
                dto.Empresa.Remove(pEmpresa);
                dto.SaveChanges();
            }

            return pEmpresa;
        }

        public List<EmpresaModel> CarregarTodosEmpresa()
        {
            List<EmpresaModel> listaRetorno = new List<EmpresaModel>();
            using (var dto = new EmpresaDAO())
            {
                var query = from p in dto.Empresa
                            orderby p.NomeFantasia
                            select p;

                foreach (var Empresa in query)
                {
                    listaRetorno.Add(new EmpresaModel(Empresa.Id, Empresa.UF, Empresa.NomeFantasia, Empresa.CNPJ));
                }
            }

            return listaRetorno;
        }

        public List<EmpresaModel> BuscarEmpresa(EmpresaModel pEmpresaModel)
        {
            List<EmpresaModel> listaRetorno = new List<EmpresaModel>();
            using (var dto = new EmpresaDAO())
            {
                var query = from p in dto.Empresa
                            orderby p.NomeFantasia
                            where p.Id == 1
                            select p;

                query = FiltarObjeto(query, pEmpresaModel);

                foreach (var cliente in query)
                {
                    listaRetorno.Add(new EmpresaModel(cliente.Id, cliente.UF, cliente.NomeFantasia, cliente.CNPJ));
                }
            }

            return listaRetorno;
        }

        private IQueryable<EmpresaModel> FiltarObjeto(IQueryable<EmpresaModel> pQuery, EmpresaModel pEmpresaModel)
        {
            if (pEmpresaModel.Id > 0)
                pQuery = pQuery.Where(c => c.Id == pEmpresaModel.Id);
            if (!string.IsNullOrEmpty(pEmpresaModel.UF))
                pQuery = pQuery.Where(c => c.UF.ToUpper().Contains(pEmpresaModel.UF.ToUpper()));
            if (!string.IsNullOrEmpty(pEmpresaModel.NomeFantasia))
                pQuery = pQuery.Where(c => c.NomeFantasia.ToUpper().Contains(pEmpresaModel.NomeFantasia.ToUpper()));
            if (!string.IsNullOrEmpty(pEmpresaModel.CNPJ))
                pQuery = pQuery.Where(c => c.CNPJ.ToUpper().Contains(pEmpresaModel.CNPJ.ToUpper()));

            return pQuery;
        }
    }
}