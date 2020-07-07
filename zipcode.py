from uszipcode import SearchEngine, SimpleZipcode, Zipcode
search = SearchEngine()


zipcodes = []
lat = [34.1145386, 33.9125144, 33.9790468, 34.0449637, 34.0737376, 33.9296643]
lng = [-84.0639456, -83.9668891, -84.1133993, -84.4102292, -84.3502432, -84.2103331]

for x in range(0, len(lat)):
    zipcodes.append(search.by_coordinates(lat[x], lng[x], radius=5.0, zipcode_type='Standard', sort_by='dist', returns=1)[0].zipcode)

zips = len(set(zipcodes))
len(set(zipcodes))

print(zipcodes)