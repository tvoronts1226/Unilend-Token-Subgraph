import { BigInt } from "@graphprotocol/graph-ts"
import {
  UniLendToken,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/UniLendToken/UniLendToken"
import { _Approval, _OwnershipTransferred, _Transfer } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let entity = _Approval.load(event.params.value.toHex())

  if (entity == null) {
    entity = new _Approval(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let entity = _OwnershipTransferred.load(event.params.newOwner.toHex())

  if (entity == null) {
    entity = new _OwnershipTransferred(event.params.newOwner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.newOwner = event.params.newOwner
  entity.previousOwner = event.params.previousOwner
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  let entity = _Transfer.load(event.params.value.toHex())

  if (entity == null) {
    entity = new _Transfer(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
