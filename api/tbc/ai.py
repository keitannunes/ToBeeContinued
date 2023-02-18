import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.organization = os.getenv("OPENAI_ORG")
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_ideas(key_words: str) -> list[str]:
  if key_words:
    list_of_options_data = openai.Completion.create(
      model="text-davinci-003",
      prompt=f"List 5 story ideas with these key words: {key_words}. without the title of the story",
      max_tokens=500,
      temperature=0.4
    )
  else:
    list_of_options_data = openai.Completion.create(
      model="text-davinci-003",
      prompt=f"List 5 creative story ideas",
      max_tokens=500,
      temperature=0.4
    )
  list_of_options = list_of_options_data.choices[0].text[2:].split('\n')
  list_of_options = list(filter(None, list_of_options)) #Remove empty strings
  for i in range(len(list_of_options)):
    list_of_options[i] = "".join(list_of_options[i].partition(" ")[2:])
  return list_of_options

def generate_images(idea: str) -> list[str]:
  imgData = openai.Image.create(
    prompt= f'{idea} in a cartoonish style ',
    n=3,
    size="1024x1024"
  )

  list_of_images = []
  for img in imgData["data"]:
    list_of_images.append(img.url)
  return list_of_images

def generate_script(idea : str) -> str:
  script = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"Create a short story with the given plot: {idea}",
    max_tokens=800,
    temperature=0.4
  )
  return script.choices[0].text[2:]

def expand_script(idea : str, old_script : str) -> str:

  script = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"Given this story idea: {idea} and this script {old_script}, expand upon the script",
    max_tokens=800,
    temperature=0.4
  )
  return script.choices[0].text[2:]

def generate_title(idea : str) -> str:
  title = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"Given this story idea: {idea} create a title for this story without the quotation marks",
    max_tokens=800,
    temperature=0.4
  )
  return title.choices[0].text[2:]


