ZIP := try_google.zip

all: package

clean:
	rm -f $(ZIP)

package:
	zip -r $(ZIP) manifest.json html icons js