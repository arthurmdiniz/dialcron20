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
public class TipoAtendimentoDAO {
     
    // buscar todas as unidades
    public List<Object[]> listarTipoAtendimento() {
        List<Object[]> atendimento = new ArrayList<>();
        String sql = "SELECT ID, DES_ATENDIMENTO FROM MED_TIPO_ATENDIMENTO";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Object[] linha = new Object[2];
                linha[0] = rs.getInt("ID");
                linha[1] = rs.getString("DES_ATENDIMENTO");
                atendimento.add(linha);
            }  
        } catch (SQLException e) {
            System.err.println("Erro ao listar tipo atendimento: " + e.getMessage());
        }
        return atendimento;
    }
    
    public List<Object[]> listarAtendimentoAtivas() {
        List<Object[]> tipoAtendimento = new ArrayList<>();
        String sql = "SELECT ID, DES_ATENDIMENTO FROM MED_TIPO_ATENDIMENTO WHERE ATIVO = 'S' ORDER BY DES_ATENDIMENTO";
        
        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Object[] linha = new Object[2];
                linha[0] = rs.getInt("ID");
                linha[1] = rs.getString("DES_ATENDIMENTO");
                tipoAtendimento.add(linha);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao listar especialidades ativas: " + e.getMessage());
        }
        return tipoAtendimento;
    }
    
    public Object[] buscarAtendimentoPorID(int id) {
        String sql = "SELECT * FROM MED_TIPO_ATENDIMENTO WHERE ID = ?";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setInt(1,id);      
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Object[] especilidades = new Object[18];
                especilidades[0] = rs.getInt("ID");            
                especilidades[1] = rs.getString("DES_ATENDIMENTO");
                especilidades[2] = rs.getString("ATIVO");
                return especilidades;
                }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar especilidade: " + e.getMessage());
        }
        return null;
    } 

    public Object[] buscarAtendimentoPorDescricao(String desAtendimento) {
        String sql = "SELECT * FROM MED_TIPO_ATENDIMENTO WHERE DES_ATENDIMENTO = ? AND ATIVO = 'S'";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setString(1,desAtendimento);      
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Object[] especilidades = new Object[3];
                especilidades[0] = rs.getInt("ID");            
                especilidades[1] = rs.getString("DES_ATENDIMENTO");
                especilidades[2] = rs.getString("ATIVO");
                return especilidades;
                }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar atendimento: " + e.getMessage());
        }
        return null;
    } 
    
    public boolean incluirTipoAtendimento(String desAtendimento) {
        String sql = "INSERT INTO MED_TIPO_ATENDIMENTO (DES_ATENDIMENTO, ATIVO) VALUES (?, ?)";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {

            stmt.setString(1, desAtendimento);
            stmt.setString(2, "S");

            return stmt.executeUpdate() > 0;

        } catch (SQLException e) {
            System.err.println("Erro ao incluir tipo de atendimento: " + e.getMessage());
            return false;
        }
    }
    
    public boolean atualizarTipoAtendimento(int id, String desAtendimento, String ativo) {
        String sql = "UPDATE MED_TIPO_ATENDIMENTO SET DES_ATENDIMENTO = ?, ATIVO = ? WHERE ID = ?"; 
        
        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setString(1, desAtendimento);
            stmt.setString(2, ativo); 
            stmt.setInt(3, id); 
            
            return stmt.executeUpdate() > 0; 
            
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar tipo do atendimento: " + e.getMessage()); 
            return false; 
        }
    }
}
