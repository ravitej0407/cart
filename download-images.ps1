# Download grocery photos from Unsplash (free license)
$ErrorActionPreference = 'Continue'
$base = Split-Path -Parent $MyInvocation.MyCommand.Path
$productsDir = Join-Path $base 'images\products'
$categoriesDir = Join-Path $base 'images\categories'
$imagesDir = Join-Path $base 'images'

$downloads = @{
  # Products
  'products/apple.jpg' = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&q=80'
  'products/banana.jpg' = 'https://images.unsplash.com/photo-1571771890050-35b965cf9329?w=400&h=400&fit=crop&q=80'
  'products/orange.jpg' = 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&q=80'
  'products/mango.jpg' = 'https://images.unsplash.com/photo-1553279768-8650fa948781?w=400&h=400&fit=crop&q=80'
  'products/tomato.jpg' = 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop&q=80'
  'products/potato.jpg' = 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&q=80'
  'products/onion.jpg' = 'https://images.unsplash.com/photo-1618512496248-a07f17e39b9e?w=400&h=400&fit=crop&q=80'
  'products/carrot.jpg' = 'https://images.unsplash.com/photo-1598170845058-32b9d6df5b69?w=400&h=400&fit=crop&q=80'
  'products/amul-milk.jpg' = 'https://images.unsplash.com/photo-1563636612-e9143da7973b?w=400&h=400&fit=crop&q=80'
  'products/curd.jpg' = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop&q=80'
  'products/paneer.jpg' = 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop&q=80'
  'products/amul-butter.jpg' = 'https://images.unsplash.com/photo-1589985270554-7193e2b7a7e2?w=400&h=400&fit=crop&q=80'
  'products/india-gate-rice.jpg' = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80'
  'products/fortune-rice.jpg' = 'https://images.unsplash.com/photo-1536304997883-4f358998aa78?w=400&h=400&fit=crop&q=80'
  'products/sona-masoori-rice.jpg' = 'https://images.unsplash.com/photo-1586201375775-7e1a1b4c5a2a?w=400&h=400&fit=crop&q=80'
  'products/loreal-shampoo.jpg' = 'https://images.unsplash.com/photo-1527799820374-dcf8d9a4e388?w=400&h=400&fit=crop&q=80'
  'products/tresemme-shampoo.jpg' = 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop&q=80'
  'products/parachute-oil-hair.jpg' = 'https://images.unsplash.com/photo-1608248543809-9a8e7054b8b7?w=400&h=400&fit=crop&q=80'
  'products/indulekha-oil.jpg' = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80'
  'products/chana-dal.jpg' = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80'
  'products/rajma.jpg' = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop&q=80'
  'products/kabuli-chana.jpg' = 'https://images.unsplash.com/photo-1515546329362-7114e4a4c177?w=400&h=400&fit=crop&q=80'
  'products/green-gram.jpg' = 'https://images.unsplash.com/photo-1595853035070-59a39f4e7a2e?w=400&h=400&fit=crop&q=80'
  'products/gemini-oil.jpg' = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80'
  'products/gingelly-oil.jpg' = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80'
  'products/parachute-oil.jpg' = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&q=80'
  'products/amul-ghee.jpg' = 'https://images.unsplash.com/photo-1589985270554-7193e2b7a7e2?w=400&h=400&fit=crop&q=80'
  'products/aachi-garam-masala.jpg' = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80'
  'products/sakthi-sambar.jpg' = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80'
  'products/eastern-spices.jpg' = 'https://images.unsplash.com/photo-1506368249637-73a05d6f6488?w=400&h=400&fit=crop&q=80'
  'products/mtr-rasam.jpg' = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80'
  'products/munch.jpg' = 'https://images.unsplash.com/photo-1549009199-677c179ef42b?w=400&h=400&fit=crop&q=80'
  'products/snickers.jpg' = 'https://images.unsplash.com/photo-1606312619070-d48b4cbc7255?w=400&h=400&fit=crop&q=80'
  'products/ferrero-rocher.jpg' = 'https://images.unsplash.com/photo-1548907040-4baa0d2f2a7d?w=400&h=400&fit=crop&q=80'
  'products/hersheys.jpg' = 'https://images.unsplash.com/photo-1606312619070-d48b4cbc7255?w=400&h=400&fit=crop&q=80'
  'products/minute-maid.jpg' = 'https://images.unsplash.com/photo-1600271886742-f049cd4511b3?w=400&h=400&fit=crop&q=80'
  'products/frooti.jpg' = 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop&q=80'
  'products/maaza.jpg' = 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop&q=80'
  'products/appy-fizz.jpg' = 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop&q=80'
  'products/madhur-sugar.jpg' = 'https://images.unsplash.com/photo-1582716401307-b2407a7b9d9b?w=400&h=400&fit=crop&q=80'
  'products/trust-sugar.jpg' = 'https://images.unsplash.com/photo-1582716401307-b2407a7b9d9b?w=400&h=400&fit=crop&q=80'
  'products/brown-sugar.jpg' = 'https://images.unsplash.com/photo-1582716401307-b2407a7b9d9b?w=400&h=400&fit=crop&q=80'
  'products/organic-jaggery.jpg' = 'https://images.unsplash.com/photo-1587049352846-4a222e784422?w=400&h=400&fit=crop&q=80'
  # Categories
  'categories/all.jpg' = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=160&h=160&fit=crop&q=80'
  'categories/fresh.jpg' = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=160&h=160&fit=crop&q=80'
  'categories/vegetables.jpg' = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=160&h=160&fit=crop&q=80'
  'categories/fruits.jpg' = 'https://images.unsplash.com/photo-1619566631896-106ae2646365?w=160&h=160&fit=crop&q=80'
  'categories/dairy.jpg' = 'https://images.unsplash.com/photo-1628088062854-d1870b130173?w=160&h=160&fit=crop&q=80'
  'categories/atta-rice-dal.jpg' = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=160&h=160&fit=crop&q=80'
  'categories/oil-ghee.jpg' = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=160&h=160&fit=crop&q=80'
  'categories/snacks.jpg' = 'https://images.unsplash.com/photo-1558961363-fa8dde79f173?w=160&h=160&fit=crop&q=80'
  'categories/drinks.jpg' = 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=160&h=160&fit=crop&q=80'
  'categories/tea-coffee.jpg' = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=160&h=160&fit=crop&q=80'
  'categories/instant-food.jpg' = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=160&h=160&fit=crop&q=80'
  'categories/frozen.jpg' = 'https://images.unsplash.com/photo-1571771890050-35b965cf9329?w=160&h=160&fit=crop&q=80'
  'categories/beauty.jpg' = 'https://images.unsplash.com/photo-1527799820374-dcf8d9a4e388?w=160&h=160&fit=crop&q=80'
  'categories/cleaning.jpg' = 'https://images.unsplash.com/photo-1585421514284-efb74c19c41e?w=160&h=160&fit=crop&q=80'
  'categories/baby.jpg' = 'https://images.unsplash.com/photo-1515488042361-ee00e3ddd4e4?w=160&h=160&fit=crop&q=80'
  'categories/pet.jpg' = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=160&h=160&fit=crop&q=80'
  # Hero banner
  'banner.jpg' = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=450&fit=crop&q=85'
}

$ok = 0; $fail = 0
foreach ($entry in $downloads.GetEnumerator()) {
  $outPath = Join-Path $imagesDir $entry.Key
  $dir = Split-Path $outPath -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  try {
    Invoke-WebRequest -Uri $entry.Value -OutFile $outPath -UseBasicParsing -TimeoutSec 30
    $size = (Get-Item $outPath).Length
    if ($size -gt 1000) { $ok++; Write-Host "OK  $($entry.Key)" } else { $fail++; Write-Host "FAIL (small) $($entry.Key)" }
  } catch {
    $fail++
    Write-Host "FAIL $($entry.Key): $_"
  }
  Start-Sleep -Milliseconds 200
}
Write-Host "`nDone: $ok succeeded, $fail failed"
