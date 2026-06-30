import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';

export default function App() {
  const [inicio, setInicio] = useState(true);
  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState('');
  const [linkImg, setLinkImg] = useState(''); // Guarda o link da imagem que você colar

  const buscarFilmes = async () => {
    try {
      const res = await fetch('http://10.0.2.2:3000/filmes');
      setFilmes(await res.json());
    } catch (e) { console.log(e); }
  };
  useEffect(() => { buscarFilmes(); }, []);

  const addFilme = () => {
    if (!nome.trim()) return;
    // Se você não colar nenhum link, ele usa uma imagem padrão de cinema
    const imgPadrao = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150';
    setFilmes([{ id: Date.now().toString(), nome, ano: '2026', imagem: linkImg.trim() || imgPadrao }, ...filmes]);
    setNome('');
    setLinkImg('');
  };

  if (inicio) {
    return (
      <SafeAreaView style={[s.bg, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={s.logo}>RAFAFLIX</Text>
        <TouchableOpacity style={s.btn} onPress={() => setInicio(false)}><Text style={s.btnTxt}>ENTRAR NO APP</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.bg}>
      <View style={s.row}>
        <TouchableOpacity onPress={() => setInicio(true)}><Text style={{ color: '#aaa' }}>← Voltar</Text></TouchableOpacity>
        <Text style={[s.logo, { fontSize: 24, marginBottom: 0 }]}>RAFAFLIX</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={s.form}>
        <TextInput style={s.input} placeholder="Nome do Filme..." placeholderTextColor="#777" value={nome} onChangeText={setNome} />
        <TextInput style={s.input} placeholder="Cole o Link da Imagem (.jpg, .png)..." placeholderTextColor="#777" value={linkImg} onChangeText={setLinkImg} />
        <TouchableOpacity style={s.btn} onPress={addFilme}><Text style={s.btnTxt}>+ Adicionar Filme</Text></TouchableOpacity>
      </View>

      <FlatList data={filmes} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
        <View style={s.card}>
          {/* Aqui o app renderiza a imagem que vem da API ou do seu campo de texto! */}
          <Image source={{ uri: item.imagem || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=150' }} style={s.img} />
          <View style={{ padding: 15, justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{item.nome}</Text>
            <Text style={{ color: '#999' }}>{item.ano || '2026'}</Text>
          </View>
        </View>
      )} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#111', paddingTop: 30 },
  logo: { color: '#E50914', fontSize: 45, fontWeight: 'bold', letterSpacing: 3, marginBottom: 20 },
  btn: { backgroundColor: '#E50914', padding: 12, borderRadius: 5, alignItems: 'center' },
  btnTxt: { color: '#fff', fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  form: { backgroundColor: '#222', padding: 15, marginHorizontal: 16, marginBottom: 10, borderRadius: 8 },
  input: { backgroundColor: '#333', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 10 },
  card: { backgroundColor: '#1c1c1c', flexDirection: 'row', marginVertical: 6, marginHorizontal: 16, borderRadius: 6, overflow: 'hidden' },
  img: { width: 75, height: 95, backgroundColor: '#333' }
});