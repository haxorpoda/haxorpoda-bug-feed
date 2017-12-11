# convert MFNB_Col_Brentidae_Trachelizinae_D0033a.10.png -threshold 40%% bg.removed.png
# convert MFNB_Col_Brentidae_Trachelizinae_D0033a.10.png bg.removed.png \
#           -alpha off -compose CopyOpacity -composite \
#           overlay_removed.png


# convert MFNB_Col_Brentidae_Trachelizinae_D0033a.10.png \( +clone -fx 'p{0,0}' \) \
#           -compose Difference  -composite  \
#           -modulate 100,0  -alpha off  difference.png
# convert difference.png -threshold 40  boolean_mask.png
# convert MFNB_Col_Brentidae_Trachelizinae_D0033a.10.png  boolean_mask.png \
#           -alpha off -compose CopyOpacity -composite \
#           cyclops_boolean.png


for entry in /media/select/INTENSO/haxorpoda-michas-selection/Insekten_Mittel/*
# for entry in /media/select/INTENSO/haxorpoda-test/*
do
  echo "$entry"
	convert $entry -bordercolor white -border 1x1 \
	  -alpha set -channel RGBA -fuzz 40% \
	  -fill none -floodfill +0+0 white \
    -shave 1x1 \
    -set filename:base "%[base]" "/media/select/INTENSO/haxorpoda-1-no-bg/%[filename:base].png"
done

