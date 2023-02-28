import { useQuery, useMutation, useQueryClient } from "react-query"
import apiClient from "utils/apiClient"

export const useShipmentNotes = (shipmentId: number) => useQuery(['shipment-notes', shipmentId], () => fetchShipmentNotes(shipmentId))

export const useSaveShipmentNote = (onSuccess: () => void) => {
    const queryClient = useQueryClient();
    return useMutation(saveShipmentNote, {
        onSuccess: () => {
           queryClient.invalidateQueries('shipment-notes');
           onSuccess();
        }
    })
}

export const useDeleteShipmentNote = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteFreightNotes, {
        onSuccess: () => {
            queryClient.invalidateQueries('shipment-notes')
        }
    })
}

const fetchShipmentNotes = async (shipmentId: number) => await apiClient.get(`freight-notes/${shipmentId}`, {data: {}})
    .then(response => response.data)

const saveShipmentNote = async (data: any) => await apiClient.post('freight-notes', data)
    .then(response => response)

export const deleteFreightNotes = async (noteId: number) => await apiClient.delete(`freight-notes/${noteId}`, {data:{}})
    .then(response => response)