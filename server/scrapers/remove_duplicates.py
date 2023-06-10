import json
# def combine_json(json1, json2):
#     # Parse JSON strings into objects
#     obj1 = json.loads(json1)["classes"]
#     obj2 = json.loads(json2)["classes"]
#     # print(obj1)

#     # Merge the objects
#     merged = {**obj1, **obj2}
#     # print(merged)

#     # Remove duplicates
#     unique = {key: value for key, value in merged.items(
#     ) if key not in obj1 or key not in obj2}
#     # unique = {}
#     # for key, value in merged.items():
#     #     if key not in unique and (value["hh"] or value["ha"] or value["hs"] or value["he"] or value["ci"] or value["cw"]):
#     #         unique[key] = value

#     # Save combined JSON to a file
#     with open('combined.json', 'w') as file:
#         json.dump(unique, file)
#     print(len(unique))
#     return unique


# # Read the contents of f22.json and s23.json
# with open('f22.json', 'r') as file1, open('s23.json', 'r') as file2:
#     json1 = file1.read()
#     json2 = file2.read()

# # Apply the combine_json function
# combined_json = combine_json(json1, json2)
# # print(combined_json)


def combine_json(json1, json2):
    # Parse JSON strings into objects
    obj1 = json.loads(json1)["classes"]
    obj2 = json.loads(json2)["classes"]
    # Merge the objects
    merged = {}
    for key, value in obj1.items():
        merged[key] = str(value)
    for key, value in obj2.items():
        merged[key] = str(value)

    # Save combined JSON to a file
    with open('combined.json', 'w') as file:
        json.dump(merged, file)
    # print(len(merged))
    return merged


# Read the contents of f22.json and s23.json
with open('f22.json', 'r') as file1, open('s23.json', 'r') as file2:
    json1 = file1.read()
    json2 = file2.read()

# Apply the combine_json function
combined_json = combine_json(json1, json2)
