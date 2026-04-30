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
public class UsuarioDAO {
    public boolean validarLogin(String usuario, String senha) {
    String sql = "SELECT SENHA FROM GER_USUARIO WHERE USUARIO = ? AND ATIVO = 'S'";
    
    try (Connection conexao = Conexao.getConexao();
         PreparedStatement stmt = conexao.prepareStatement(sql)) {
        
        stmt.setString(1, usuario);
        ResultSet rs = stmt.executeQuery();
        
        if (rs.next()) {
            String senhaBanco = rs.getString("SENHA");
            //(sem criptografia)
            return senha.equals(senhaBanco);
        }
        
    } catch (SQLException e) {
        System.err.println("Erro ao validar login: " + e.getMessage());
    }
    return false;
    }
    
    public String verificarStatusUsuario(String usuario) {
        String sql = "SELECT ATIVO FROM GER_USUARIO WHERE USUARIO = ?";
        
        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setString(1, usuario);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                String ativo = rs.getString("ATIVO");
                return ativo; // Retorna "S" ou "N"
            } else {
                return "NAO_EXISTE"; // Usuário não existe
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao verificar status: " + e.getMessage());
            return "ERRO";
        }
    }
    
    public Object[] obterDadosUsuario(String usuario) {
        String sql = "SELECT ID, USUARIO, NOME, EMAIL, ATIVO FROM GER_USUARIO WHERE USUARIO = ?";
        
        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setString(1, usuario);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                Object[] dados = new Object[5];
                dados[0] = rs.getInt("ID");
                dados[1] = rs.getString("USUARIO");
                dados[2] = rs.getString("NOME");
                dados[3] = rs.getString("EMAIL");
                dados[4] = rs.getString("ATIVO");
                return dados;
            }
        } catch (SQLException e) {
            System.err.println("Erro ao obter dados do usuário: " + e.getMessage());
        }
        return null;
    }
    
     public List<Object[]> listarUsuarios() {
        List<Object[]> usuarios = new ArrayList<>();
        String sql = "SELECT ID, LOGIN  FROM GER_USUARIO";
        
        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Object[] linha = new Object[2];
                linha[0] = rs.getInt("ID");
                linha[1] = rs.getString("LOGIN");
                usuarios.add(linha);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar usuarios: " + e.getMessage());
        }
        return usuarios;
    }
    
    public boolean autenticar(String usuario, String senha) {
        Connection conexao = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conexao = Conexao.getConexao();
            String sql = "SELECT id FROM GER_USUARIO WHERE login = ? AND senha = ? AND ativo = 'S'";
            stmt = conexao.prepareStatement(sql);
            stmt.setString(1, usuario);
            stmt.setString(2, senha);
            rs = stmt.executeQuery();
          
            return rs.next(); 
            
        } catch (Exception e) {
            //logger.log(java.util.logging.Level.SEVERE, "Erro na autenticação", e);
            //javax.swing.JOptionPane.showMessageDialog(this, 
            //    "Erro1 ao conectar com o banco de dados!", "Erro", 
            //    javax.swing.JOptionPane.ERROR_MESSAGE);
            return false;
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conexao != null) conexao.close();
            } catch (Exception e) {
                //logger.log(java.util.logging.Level.SEVERE, "Erro ao fechar conexão", e);
            }
        }
    }
    
    public Object[] buscarUsuarioPorId(int id) {
        String sql = "SELECT * FROM GER_USUARIO WHERE ID = ?";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setInt(1,id);      
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Object[] usuario = new Object[7];
                usuario[0] = rs.getInt("ID");            
                usuario[1] = rs.getString("LOGIN");
                usuario[2] = rs.getString("SENHA");
                usuario[3] = rs.getString("NOME");
                usuario[4] = rs.getString("PERFIL");
                usuario[5] = rs.getString("GRUPO");
                usuario[6] = rs.getString("ATIVO");
                return usuario;
             }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar usuario: " + e.getMessage());
        }
        return null;
    }

    public boolean incluirUsuario(String login, String senha, String nome, String perfil, String grupo, Object object) {
        String sql = "INSERT INTO GER_USUARIO (LOGIN, SENHA, NOME, PERFIL, GRUPO, ATIVO) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setString(1, login);
            stmt.setString(2, senha);
            stmt.setString(3, nome);
            stmt.setString(4, perfil);
            stmt.setString(5, grupo);
            stmt.setString(6, (String) object);
            
            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao incluir usuario: " + e.getMessage());
            return false;
        }
    }

    public boolean atualizarUsuario(String id, String login, String senha, String nome, String perfil, String grupo,
            String ativo) {
        String sql = "UPDATE GER_USUARIO SET LOGIN = ?, SENHA = ?, NOME = ?, PERFIL = ?, GRUPO = ?, ATIVO = ? WHERE ID = ?";
        try (Connection conexao = Conexao.getConexao();
            PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setString(1, login);
            stmt.setString(2, senha);
            stmt.setString(3, nome);
            stmt.setString(4, perfil);
            stmt.setString(5, grupo);
            stmt.setString(6, ativo);
            stmt.setString(7, id);
            
            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;
            
        } catch (SQLException e) {
            System.err.println("Erro ao atualizar usuario: " + e.getMessage());
            return false;
        }
    }
} //fim de tudo
