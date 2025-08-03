# 🍽️ Lezzetli Yemek Kitabı

Modern ve kullanıcı dostu bir yemek tarifi uygulaması. Tamamen offline çalışır, yerel resim yükleme, kategori yönetimi ve veri yedekleme özellikleri ile.

## ✨ Özellikler

- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- 🔍 **Arama Fonksiyonu**: Yemek adı veya malzemeye göre arama
- 🏷️ **Dinamik Kategori Yönetimi**: Kategori ekleme, silme, düzenleme
- 📸 **Yerel Resim Yükleme**: Bilgisayarınızdan resim yükleme
- 🎥 **Video Linkleri**: YouTube ve Pinterest video linkleri
- 💾 **Tamamen Offline**: İnternet bağlantısı gerektirmez
- 🔄 **Veri Yedekleme**: Verileri dışa aktarma ve içe aktarma
- 🗑️ **Tarif Silme**: İstenmeyen tarifleri silme
- ⭐ **Zorluk Seviyesi**: Kolay, orta, zor kategorileri
- ⏱️ **Hazırlama Süresi**: Dakika cinsinden süre bilgisi

## 🚀 Nasıl Kullanılır

1. **Uygulamayı Açın**: `index.html` dosyasını tarayıcınızda açın
2. **Tarifleri Görüntüleyin**: Ana sayfada mevcut tarifleri inceleyin
3. **Arama Yapın**: Üst kısımdaki arama kutusunu kullanın
4. **Kategori Filtreleyin**: Kategori butonlarını kullanın
5. **Yeni Tarif Ekleyin**: "Yeni Tarif Ekle" butonuna tıklayın
6. **Kategorileri Yönetin**: "Kategorileri Yönet" butonuna tıklayın
7. **Video İzleyin**: Video linki olan tariflerde "Video" butonuna tıklayın
8. **Verileri Yedekleyin**: Sağ alt köşedeki ayarlar butonuna tıklayın

## 📝 Yeni Tarif Ekleme

1. "Yeni Tarif Ekle" butonuna tıklayın
2. Tüm alanları doldurun:
   - **Yemek Adı**: Tarifin adı
   - **Kategori**: Mevcut kategorilerden seçin
   - **Resim Seç**: Bilgisayarınızdan resim dosyası seçin
   - **Malzemeler**: Her malzemeyi yeni satıra yazın
   - **Hazırlanışı**: Adım adım talimatlar
   - **Video Linki**: YouTube veya Pinterest linki (isteğe bağlı)
   - **Hazırlama Süresi**: Dakika cinsinden
   - **Zorluk Seviyesi**: Kolay, orta veya zor
3. "Kaydet" butonuna tıklayın

## 🏷️ Kategori Yönetimi

1. "Kategorileri Yönet" butonuna tıklayın
2. **Yeni Kategori Ekleme**:
   - Kategori adını yazın
   - "Ekle" butonuna tıklayın
3. **Kategori Silme**:
   - Kategori yanındaki "Sil" butonuna tıklayın
   - **Not**: İçinde tarif olan kategoriler silinemez

## 💾 Veri Yedekleme

### Verileri Dışa Aktarma (Yedekleme)
1. Sağ alt köşedeki ayarlar butonuna tıklayın
2. "Verileri İndir" butonuna tıklayın
3. JSON dosyası bilgisayarınıza indirilecek

### Verileri İçe Aktarma (Geri Yükleme)
1. Sağ alt köşedeki ayarlar butonuna tıklayın
2. "Dosya Seç" butonuna tıklayın
3. Daha önce indirdiğiniz JSON dosyasını seçin
4. Onay verin

## 🎨 Tasarım Özellikleri

- **Modern Gradient Arka Plan**: Mor-mavi geçişli arka plan
- **Kart Tasarımı**: Her tarif için şık kartlar
- **Hover Efektleri**: Etkileşimli animasyonlar
- **Modal Pencereler**: Detaylı görüntüleme için
- **Responsive Grid**: Otomatik düzen ayarlama
- **Font Awesome İkonları**: Görsel zenginlik
- **Yüzen Ayarlar Butonu**: Kolay erişim

## 📁 Dosya Yapısı

```
yemek-kitabi-app/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript fonksiyonları
└── README.md           # Bu dosya
```

## 🔧 Teknik Detaylar

- **HTML5**: Modern semantik yapı
- **CSS3**: Flexbox, Grid, Animasyonlar
- **Vanilla JavaScript**: Framework kullanmadan
- **LocalStorage**: Veri saklama
- **FileReader API**: Resim yükleme
- **Blob API**: Veri dışa aktarma
- **Responsive Design**: Mobil uyumlu
- **Offline Çalışma**: İnternet bağlantısı gerektirmez

## 🌟 Örnek Tarifler

Uygulama ilk açıldığında şu örnek tarifler yüklenir:

1. **Mercimek Çorbası** - Kolay, 45 dakika
2. **Tavuk Sote** - Orta, 30 dakika  
3. **Çoban Salata** - Kolay, 15 dakika
4. **Tiramisu** - Zor, 60 dakika

## 💡 İpuçları

- **Resim Yükleme**: JPG, PNG, GIF formatları desteklenir
- **Video Linkleri**: YouTube veya Pinterest video linklerini kullanabilirsiniz
- **Malzemeler**: Her malzemeyi ayrı satıra yazın
- **Hazırlanış**: Adımları numaralandırılmış şekilde yazın
- **Veri Yedekleme**: Düzenli olarak verilerinizi yedekleyin
- **Kategori Silme**: İçinde tarif olan kategoriler silinemez

## 🔒 Veri Güvenliği

- **Yerel Depolama**: Tüm veriler tarayıcınızda saklanır
- **Offline Çalışma**: İnternet bağlantısı gerektirmez
- **Veri Yedekleme**: Verilerinizi güvenle yedekleyin
- **Gizlilik**: Verileriniz hiçbir sunucuya gönderilmez

## 🎯 Gelecek Özellikler

- [ ] Tarif düzenleme
- [ ] Favori tarifler listesi
- [ ] Tarif paylaşma
- [ ] Besin değeri bilgileri
- [ ] Puanlama sistemi
- [ ] Yorum sistemi
- [ ] Çoklu dil desteği
- [ ] Tema seçenekleri

## 📞 Destek

Herhangi bir sorun yaşarsanız veya öneriniz varsa, lütfen iletişime geçin.

---

**Not**: Bu uygulama tamamen tarayıcı tabanlıdır ve internet bağlantısı gerektirmez. Tüm verileriniz tarayıcınızda saklanır ve güvenle yedeklenebilir. 