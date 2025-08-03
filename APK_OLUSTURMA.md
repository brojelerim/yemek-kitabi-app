# 📱 Android APK Oluşturma Talimatları

## 🚀 PWA Builder ile APK Oluşturma

### Adım 1: Dosyaları Hazırlama
✅ Tüm dosyalar hazır:
- `index.html` - Ana uygulama
- `style.css` - Stiller
- `script.js` - JavaScript kodları
- `manifest.json` - PWA manifest
- `sw.js` - Service Worker

### Adım 2: PWA Builder'a Yükleme
1. [PWA Builder](https://www.pwabuilder.com/) sitesine gidin
2. "Enter your site URL" kısmına sitenizin URL'sini girin
   - **Eğer siteniz yoksa**: Dosyaları GitHub Pages'e yükleyin
   - **Alternatif**: Dosyaları bir web sunucusuna yükleyin

### Adım 3: APK Oluşturma
1. PWA Builder'da "Build My PWA" butonuna tıklayın
2. "Android" sekmesine gidin
3. "Download" butonuna tıklayın
4. APK dosyasını indirin

## 🌐 Alternatif: GitHub Pages ile Ücretsiz Hosting

### Adım 1: GitHub Repository Oluşturma
1. GitHub'da yeni repository oluşturun
2. Tüm dosyaları yükleyin

### Adım 2: GitHub Pages Aktifleştirme
1. Repository Settings > Pages
2. Source: Deploy from a branch
3. Branch: main
4. Save

### Adım 3: URL Alın
- `https://kullaniciadi.github.io/repo-adi/` şeklinde URL alırsınız
- Bu URL'yi PWA Builder'a girin

## 📋 Manuel APK Oluşturma (Gelişmiş)

### Gereksinimler:
- Node.js
- Android Studio
- Java JDK

### Adım 1: Cordova Kurulumu
```bash
npm install -g cordova
```

### Adım 2: Proje Oluşturma
```bash
cordova create yemek-kitabi-mobile com.example.yemekkitabi "Yemek Kitabı"
cd yemek-kitabi-mobile
```

### Adım 3: Platform Ekleme
```bash
cordova platform add android
```

### Adım 4: Dosyaları Kopyalama
- `www/` klasörüne tüm dosyalarınızı kopyalayın
- `www/index.html` dosyasını güncelleyin

### Adım 5: Build
```bash
cordova build android
```

## 🔧 Özelleştirmeler

### İkon Değiştirme
- `manifest.json` dosyasındaki icon URL'lerini değiştirin
- 192x192 ve 512x512 boyutlarında PNG dosyaları kullanın

### Uygulama Adı Değiştirme
- `manifest.json` dosyasında "name" ve "short_name" değerlerini değiştirin

### Renk Değiştirme
- `manifest.json` dosyasında "theme_color" değerini değiştirin
- `style.css` dosyasında renk kodlarını güncelleyin

## 📱 Test Etme

### Android'de Test
1. APK dosyasını Android cihaza kopyalayın
2. "Bilinmeyen kaynaklar"dan yüklemeye izin verin
3. APK'yı yükleyin ve test edin

### Özellikler
- ✅ Offline çalışma
- ✅ Yerel depolama
- ✅ Resim yükleme
- ✅ Kategori yönetimi
- ✅ Veri yedekleme
- ✅ Arama ve filtreleme

## 🆘 Sorun Giderme

### APK Yüklenmiyor
- Android cihazda "Bilinmeyen kaynaklar"ı aktifleştirin
- APK dosyasının bozuk olmadığından emin olun

### Uygulama Çalışmıyor
- İnternet bağlantısını kontrol edin
- Tarayıcı cache'ini temizleyin
- Uygulamayı yeniden yükleyin

### Resim Yükleme Çalışmıyor
- Android izinlerini kontrol edin
- Dosya boyutunu kontrol edin (5MB altında olmalı)

## 📞 Destek
Herhangi bir sorun yaşarsanız:
1. Hata mesajını not edin
2. Android sürümünü belirtin
3. Cihaz modelini belirtin 