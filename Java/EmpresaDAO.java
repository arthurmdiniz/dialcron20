/*
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package principal.DAO;

import principal.Conexao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author arthurmdiniz
 */
public class EmpresaDAO {
     
    // buscar todas as unidades
    public List<Object[]> listarUnidades() {
        List<Object[]> unidades = new ArrayList<>();
        String sql = "SELECT ID, NOME_FANTASIA FROM GER_UNIDADE";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Object[] linha = new Object[2];
                linha[0] = rs.getInt("ID");
                linha[1] = rs.getString("NOME_FANTASIA");
                unidades.add(linha);
            } 
        } catch (SQLException e) {
            System.err.println("Erro ao listar unidades: " + e.getMessage());
        }
        return unidades;
    }
    
    // por ID
    public Object[] buscarUnidadePorId(int id) {
        String sql = "SELECT * FROM GER_UNIDADE WHERE ID = ?";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setInt(1,id);      
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Object[] unidade = new Object[18];
                unidade[0] = rs.getInt("ID");            
                unidade[1] = rs.getString("CLIENTE");
                unidade[2] = rs.getString("NOME_FANTASIA");
                unidade[3] = rs.getString("RAZAO_SOCIAL");
                unidade[4] = rs.getString("CNPJ");
                unidade[5] = rs.getString("INSC_ESTADUAL");
                unidade[6] = rs.getString("INSC_MUNICIPAL");
                unidade[7] = rs.getString("CEP");
                unidade[8] = rs.getString("LOGRADOURO");
                unidade[9] = rs.getString("NUMERO");
                unidade[10] = rs.getString("BAIRRO");
                unidade[11] = rs.getString("COMPLEMENTO");
                unidade[12] = rs.getString("MUNICIPIO");
                unidade[13] = rs.getString("UF");
                unidade[14] = rs.getString("PAIS");
                unidade[15] = rs.getString("EMAIL");
                unidade[16] = rs.getString("DDD");
                unidade[17] = rs.getString("TELEFONE");
                return unidade;
             }  
        } catch (SQLException e) {
            System.err.println("Erro ao buscar unidade: " + e.getMessage());
        }
        return null;
    }

    public boolean incluirEmpresa(String cliente, String nomeFantasia, String razaoSocial, String cnpj,
            String inscEstadual, String inscMunicipal, String cep, String logradouro,
            String numero, String bairro, String complemento, String municipio,
            String uf, String pais, String email, String ddd, String telefone) {
        
        String sql = "INSERT INTO GER_UNIDADE (CLIENTE, NOME_FANTASIA, RAZAO_SOCIAL, CNPJ, "
                + "INSC_ESTADUAL, INSC_MUNICIPAL, CEP, LOGRADOURO, NUMERO, BAIRRO, "
                + "COMPLEMENTO, MUNICIPIO, UF, PAIS, EMAIL, DDD, TELEFONE) "
                + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try (Connection conexao = Conexao.getConexao();
            PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setInt(1, Integer.parseInt(cliente));
            stmt.setString(2, nomeFantasia);
            stmt.setString(3, razaoSocial);
            stmt.setInt(4, Integer.parseInt(cnpj));
            stmt.setInt(5, Integer.parseInt(inscEstadual));
            stmt.setInt(6, Integer.parseInt(inscMunicipal));
            stmt.setInt(7, Integer.parseInt(cep));
            stmt.setString(8, logradouro);
            stmt.setInt(9, Integer.parseInt(numero));
            stmt.setString(10, bairro);
            stmt.setString(11, complemento);
            stmt.setString(12, municipio);
            stmt.setString(13, uf);
            stmt.setString(14, pais);
            stmt.setString(15, email);
            stmt.setInt(16, Integer.parseInt(ddd));
            stmt.setInt(17, Integer.parseInt(telefone));
            
            int linhasAfetadas =  stmt.executeUpdate();
            return linhasAfetadas > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao incluir empresa: " + e.getMessage());
            return false;
        }
    }

    public boolean atualizarEmpresa(String id, String cliente, String nomeFantasia, String razaoSocial, String cnpj,
            String inscEstadual, String inscMunicipal, String cep, String logradouro,
            String numero, String bairro, String complemento, String municipio,
            String uf, String pais, String email, String ddd, String telefone) {
        
        String sql = "UPDATE GER_UNIDADE SET CLIENTE = ?, NOME_FANTASIA = ?, RAZAO_SOCIAL = ?, CNPJ = ?, "
                + "INSC_ESTADUAL = ?, INSC_MUNICIPAL = ?, CEP = ?, LOGRADOURO = ?, NUMERO = ?, BAIRRO = ?, "
                + "COMPLEMENTO = ?, MUNICIPIO = ?, UF = ?, PAIS = ?, EMAIL = ?, DDD = ?, TELEFONE = ? "
                + "WHERE ID = ?";
        
        try (Connection conexao = Conexao.getConexao();
            PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setInt(1, Integer.parseInt(cliente));
            stmt.setString(2, nomeFantasia);
            stmt.setString(3, razaoSocial);
            stmt.setInt(4, Integer.parseInt(cnpj));
            stmt.setInt(5, Integer.parseInt(inscEstadual));
            stmt.setInt(6, Integer.parseInt(inscMunicipal));
            stmt.setInt(7, Integer.parseInt(cep));
            stmt.setString(8, logradouro);
            stmt.setInt(9, Integer.parseInt(numero));
            stmt.setString(10, bairro);
            stmt.setString(11, complemento);
            stmt.setString(12, municipio);
            stmt.setString(13, uf);
            stmt.setString(14, pais);
            stmt.setString(15, email);
            stmt.setInt(16, Integer.parseInt(ddd));
            stmt.setInt(17, Integer.parseInt(telefone));
            stmt.setInt(18, Integer.parseInt(id));
            
            int linhasAfetadas =  stmt.executeUpdate();
            return linhasAfetadas > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar empresa: " + e.getMessage());
            return false;
        }
    }
    

}//fim de tudo
