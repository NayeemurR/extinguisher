import json


def combine_json_files(file1, file2, output_file):
    """
    Combines the "classes" field of file1 and file2 and writes the combined data to output_file.
    """
    # Load data from the first JSON file
    with open(file1, 'r') as f:
        data1 = json.load(f)

    # Load data from the second JSON file
    with open(file2, 'r') as f:
        data2 = json.load(f)

    # Combine the data from both files
    combined_data = {**data1["classes"], **data2["classes"]}

    # Write the combined data to the output file
    with open(output_file, 'w') as f:
        json.dump(combined_data, f, indent=4)


# Specify the file paths
file1 = 'f22.json'
file2 = 's23.json'
output_file = 'combined.json'

# Call the function to combine the JSON files
combine_json_files(file1, file2, output_file)
