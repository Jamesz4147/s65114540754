import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  hostName: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  memberList: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  memberCard: {
    width: 150,
    height: 160,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingVertical: 12,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  memberIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
    tintColor: '#42a5f5',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  memberSubtext: {
    fontSize: 13,
    color: '#666',
  },
  addForm: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  backButton: {
    fontSize: 26,
    color: '#555',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

export default styles;
