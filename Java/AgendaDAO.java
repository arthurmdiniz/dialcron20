/*
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package principal.DAO;

import principal.Conexao;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author arthurmdiniz
 */
public class AgendaDAO {
    
    
    public List<Object[]> listarAgendamentosPorData(LocalDate dataSelecionada) {
        //mudar data para date
        Date data = java.sql.Date.valueOf(dataSelecionada);
        List<Object[]> agendamentos = new ArrayList<>();
        String sql = "SELECT " +
                     "    a.ID, " +
                     "    a.MEDICO, " +
                     "    m.NOME as NOME_MEDICO, " +
                     "    a.CLIENTE, " +
                     "    c.NOME as NOME_CLIENTE, " +
                     "    c.DTA_NASCIMENTO, " +
                     "    a.DTA_AGENDAMENTO, " +
                     "    a.SITUACAO " +
                     "FROM MED_AGENDA a " +
                     "INNER JOIN MED_MEDICO m ON a.MEDICO = m.ID " +
                     "INNER JOIN GER_CLIENTE c ON a.CLIENTE = c.CLIENTE " +
                     "WHERE DATE(a.DTA_AGENDAMENTO) between ? and ? " +
                     " AND a.SITUACAO <> 'C' " +  // nãobbusca cancelados
                     "ORDER BY a.DTA_AGENDAMENTO";
        
        try (Connection conexao = Conexao.getConexao(); PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            java.util.Calendar calInicio = java.util.Calendar.getInstance();
            calInicio.setTime(data);
            calInicio.set(java.util.Calendar.HOUR_OF_DAY, 0);
            calInicio.set(java.util.Calendar.MINUTE, 0);
            calInicio.set(java.util.Calendar.SECOND, 0);
            java.sql.Timestamp dataInicio = new java.sql.Timestamp(calInicio.getTimeInMillis()); //00:00

            java.util.Calendar calFim = java.util.Calendar.getInstance();
            calFim.setTime(data);
            calFim.set(java.util.Calendar.HOUR_OF_DAY, 23);
            calFim.set(java.util.Calendar.MINUTE, 59);
            calFim.set(java.util.Calendar.SECOND, 59);
            java.sql.Timestamp dataFim = new java.sql.Timestamp(calFim.getTimeInMillis()); //23:59

            stmt.setTimestamp(1, dataInicio); 
            stmt.setTimestamp(2, dataFim);   
        
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                Object[] agendamento = new Object[8];
                agendamento[0] = rs.getInt("ID");
                agendamento[1] = rs.getInt("MEDICO");
                agendamento[2] = rs.getString("NOME_MEDICO");
                agendamento[3] = rs.getInt("CLIENTE");
                agendamento[4] = rs.getString("NOME_CLIENTE");
                agendamento[5] = rs.getDate("DTA_NASCIMENTO");
                agendamento[6] = rs.getTimestamp("DTA_AGENDAMENTO");
                agendamento[7] = rs.getString("SITUACAO");
                
                agendamentos.add(agendamento);
            }
            
        } catch (SQLException e) {
            System.err.println("Erro ao listar agendamentos: \n SQL: "+ sql + "\n Erro: " + e.getMessage());
        } 
        return agendamentos;
    }
    
    public Object[] buscarAgendamentoPorID(int id) {
        String sql = "SELECT " +
                     "    a.ID, " +
                     "    a.MEDICO, " +
                     "    m.NOME as NOME_MEDICO, " +
                     "    a.CLIENTE, " +
                     "    c.NOME as NOME_CLIENTE, " +
                     "    c.DTA_NASCIMENTO, " +
                     "    c.TELEFONE_DDD, " +
                     "    c.TELEFONE, " +
                     "    c.CELULAR_DDD, " +
                     "    c.CELULAR, " +
                     "    a.CONVENIO, " +
                     "    v.DES_CONVENIO, " +
                     "    a.ESPECIALIDADE, " +
                     "    e.DES_ESPECIALIDADE, " +
                     "    c.SEXO, " +
                     "    a.SITUACAO " +
                     "FROM MED_AGENDA a " +
                     "INNER JOIN MED_MEDICO m ON a.MEDICO = m.ID " +
                     "INNER JOIN GER_CLIENTE c ON a.CLIENTE = c.CLIENTE " +
                     "INNER JOIN MED_ESPECIALIDADE e ON a.ESPECIALIDADE = e.ID " +
                     "LEFT JOIN MED_CONVENIO v ON a.CONVENIO = v.ID "+
                     "WHERE a.ID = ? " +
                     "ORDER BY a.DTA_AGENDAMENTO";

        try (Connection conexao = Conexao.getConexao();
             PreparedStatement stmt = conexao.prepareStatement(sql)) {
            
            stmt.setInt(1,id);      
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Object[] agendamentos = new Object[11];
                agendamentos[0] = rs.getInt("ID");
                agendamentos[1] = rs.getString("NOME_MEDICO");
                agendamentos[2] = rs.getString("NOME_CLIENTE"); 
                agendamentos[3] = rs.getDate("DTA_NASCIMENTO");
                agendamentos[4] = rs.getInt("TELEFONE_DDD");
                agendamentos[5] = rs.getInt("TELEFONE");
                agendamentos[6] = rs.getInt("CELULAR_DDD");
                agendamentos[7] = rs.getInt("CELULAR");
                agendamentos[8] = rs.getString("DES_CONVENIO");
                agendamentos[9] = rs.getString("DES_ESPECIALIDADE");
                agendamentos[10] = rs.getString("SEXO");


                return agendamentos;
             }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar Agenda: " + e.getMessage());
            System.err.println("SQL: " + sql); 
        }
        return null;
    }

    public Object[] buscarAgendamentoPorID(Object[] id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
