import axios from "axios";
import { ICreateAudio, IUpdatedAudio } from "../models/IAudio";
import { ICreateComputer, IUpdatedComputer } from "../models/IComputer";
import { ICreateMobile, IUpdatedMobile } from "../models/IMobile";
import { ICreateTelevision, IUpdatedTelevision } from "../models/ITelevision";

const api = axios.create({
  baseURL: "http://localhost:1337/api/",
});

export const getAllMobilesFromStrapi = async () => {
  return await api.get("mobiles");
};

export const getMobileByIdFromStrapi = async (id: number) => {
  return await api.get("mobiles/" + id);
};

export const createMobileToStrapi = async (data: ICreateMobile) => {
  return await api.post("mobiles", data);
};

export const deleteMobileFromStrapi = async (id: number) => {
  return await api.delete("mobiles/" + id);
};

export const updateMobileByIdToStrapi = async (
  id: number,
  data: IUpdatedMobile
) => {
  return await api.put("mobiles/" + id, data);
};

// computer

export const getAllComputersFromStrapi = async () => {
  return await api.get("computers");
};

export const getComputerByIdFromStrapi = async (id: number) => {
  return await api.get("computers/" + id);
};

export const createComputerToStrapi = async (data: ICreateComputer) => {
  return await api.post("computers", data);
};

export const deleteComputerFromStrapi = async (id: number) => {
  return await api.delete("computers/" + id);
};

export const updateComputerByIdToStrapi = async (
  id: number,
  data: IUpdatedComputer
) => {
  return await api.put("computers/" + id, data);
};

// television

export const getAllTelevisionsFromStrapi = async () => {
  return await api.get("televisions");
};

export const getTelevisionByIdFromStrapi = async (id: number) => {
  return await api.get("televisions/" + id);
};

export const createTelevisionToStrapi = async (data: ICreateTelevision) => {
  return await api.post("televisions", data);
};

export const deleteTelevisionFromStrapi = async (id: number) => {
  return await api.delete("televisions/" + id);
};

export const updateTelevisionByIdToStrapi = async (
  id: number,
  data: IUpdatedTelevision
) => {
  return await api.put("televisions/" + id, data);
};

// audio

export const getAllAudioFromStrapi = async () => {
  return await api.get("audio-devices");
};

export const getAudioByIdFromStrapi = async (id: number) => {
  return await api.get("audio-devices/" + id);
};

export const createAudioToStrapi = async (data: ICreateAudio) => {
  return await api.post("audio-devices", data);
};

export const deleteAudioFromStrapi = async (id: number) => {
  return await api.delete("audio-devices/" + id);
};

export const updateAudioByIdToStrapi = async (
  id: number,
  data: IUpdatedAudio
) => {
  return await api.put("audio-devices/" + id, data);
};
