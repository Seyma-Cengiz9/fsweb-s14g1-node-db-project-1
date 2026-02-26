-- Veritabanı Sorguları

-- Posta kodu 1010 olan tüm müşterileri bulun

-- id'si 11 olan tedarikçinin telefon numarasını bulun

-- Verilen ilk 10 siparişi, sipariş tarihine göre azalan şekilde listeleyin

-- Londra, Madrid veya Brezilya'da yaşayan tüm müşterileri bulun

-- "The Shire" için bir müşteri kaydı ekleyin, ilgili kişi adı "Bilbo Baggins", adres - "Bag End" içinde "1 Hobbit-Hole", posta kodu "111" ve ülke "Middle Earth"

-- Posta kodu "11122" olarak değişecek şekilde Bilbo Baggins kaydını güncelleyin

-- (Zorlayıcı Görev) Müşteriler tablosunda kaç farklı şehrin saklandığını keşfetmek için bir sorgu bulun. Tekrarlar çift sayılmamalıdır

-- (Zorlayıcı Görev) 20 karakterden uzun adları olan tüm tedarikçileri bulun. Adın uzunluğunu almak için "length(SupplierName)" kullanabilirsiniz.
-- 1) Posta kodu 1010 olan tüm müşteriler
SELECT * FROM Customers
WHERE PostalCode = '1010';

-- 2) id'si 11 olan tedarikçinin telefon numarası
SELECT Phone FROM Suppliers
WHERE SupplierID = 11;

-- 3) İlk 10 siparişi, tarihe göre azalan sırala
SELECT * FROM Orders
ORDER BY OrderDate DESC
LIMIT 10;

-- 4) Londra, Madrid veya Brezilya'da yaşayan müşteriler
SELECT * FROM Customers
WHERE City IN ('London', 'Madrid') OR Country = 'Brazil';

-- 5) The Shire için müşteri ekle
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Orta Dünya');

-- 6) Bilbo Baggins kaydının posta kodunu güncelle
UPDATE Customers
SET PostalCode = '11122'
WHERE ContactName = 'Bilbo Baggins';