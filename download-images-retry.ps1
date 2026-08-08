# Retry failed downloads with Wikimedia Commons & Pexels (stable URLs)
$base = 'C:\Users\ravit\zepto-clone\images'
$downloads = @{
  'products/banana.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/400px-Banana-Single.jpg'
  'products/onion.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/400px-Onion_on_White.JPG'
  'products/carrot.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Carrots_of_many_colors.jpg/400px-Carrots_of_many_colors.jpg'
  'products/amul-milk.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg'
  'products/amul-butter.jpg' = 'https://images.pexels.com/photos/410994/pexels-photo-410994.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/fortune-rice.jpg' = 'https://images.pexels.com/photos/33239/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/sona-masoori-rice.jpg' = 'https://images.pexels.com/photos/33239/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/loreal-shampoo.jpg' = 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/parachute-oil-hair.jpg' = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/kabuli-chana.jpg' = 'https://images.pexels.com/photos/4113869/pexels-photo-4113869.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/green-gram.jpg' = 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/amul-ghee.jpg' = 'https://images.pexels.com/photos/410994/pexels-photo-410994.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/eastern-spices.jpg' = 'https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/munch.jpg' = 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-conflict-65882.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/snickers.jpg' = 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-conflict-65882.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/ferrero-rocher.jpg' = 'https://images.pexels.com/photos/887354/pexels-photo-887354.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/hersheys.jpg' = 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-conflict-65882.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/minute-maid.jpg' = 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/madhur-sugar.jpg' = 'https://images.pexels.com/photos/1096264/pexels-photo-1096264.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/trust-sugar.jpg' = 'https://images.pexels.com/photos/1096264/pexels-photo-1096264.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/brown-sugar.jpg' = 'https://images.pexels.com/photos/1096264/pexels-photo-1096264.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/organic-jaggery.jpg' = 'https://images.pexels.com/photos/1096264/pexels-photo-1096264.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
  'products/mango.jpg' = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/400px-Hapus_Mango.jpg'
  'categories/fruits.jpg' = 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  'categories/dairy.jpg' = 'https://images.pexels.com/photos/162712/pexels-photo-162712.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  'categories/snacks.jpg' = 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-conflict-65882.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  'categories/frozen.jpg' = 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  'categories/beauty.jpg' = 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  'categories/cleaning.jpg' = 'https://images.pexels.com/photos/48889/soap-bubble-colorful-transparent-48889.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
  'categories/baby.jpg' = 'https://images.pexels.com/photos/3875083/pexels-photo-3875083.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop'
}

$ok=0; $fail=0
foreach ($entry in $downloads.GetEnumerator()) {
  $outPath = Join-Path $base $entry.Key
  try {
    Invoke-WebRequest -Uri $entry.Value -OutFile $outPath -UseBasicParsing -TimeoutSec 45 -UserAgent 'Mozilla/5.0'
    if ((Get-Item $outPath).Length -gt 500) { $ok++; Write-Host "OK $($entry.Key)" } else { $fail++; Write-Host "SMALL $($entry.Key)" }
  } catch { $fail++; Write-Host "FAIL $($entry.Key): $($_.Exception.Message)" }
  Start-Sleep -Milliseconds 300
}
Write-Host "Retry: $ok ok, $fail fail"
